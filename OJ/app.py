import os
import re
import subprocess
import tempfile
import traceback
import xml.etree.ElementTree as ET
from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# 在项目目录下创建临时文件夹
TEMP_DIR = os.path.join(os.path.dirname(__file__), 'tmp')
os.makedirs(TEMP_DIR, exist_ok=True)  # 确保目录存在


@app.route('/run_cpp', methods=['POST'])
def run_cpp():
    data = request.json
    code = data.get('code', '')
    inputs = data.get('inputs', '')
    outputs = []

    print(code)
    print(inputs)

    if not code:
        return jsonify({'error': 'No code provided'}), 400

    # 使用项目内的临时目录
    with tempfile.TemporaryDirectory(dir=TEMP_DIR) as tmpdir:
        cpp_file = os.path.join(tmpdir, 'program.cpp')
        exe_file = os.path.join(tmpdir, 'program.exe')

        try:
            # 写入C++代码
            with open(cpp_file, 'w', encoding='utf-8') as f:
                f.write(code)

            # 编译
            compile_result = subprocess.run(
                f"g++ {cpp_file} -o {exe_file}",
                stderr=subprocess.PIPE,
                stdout=subprocess.PIPE,
                timeout=3,
                text=True,
                shell=True,
                env={
                    **os.environ,
                    "TMP": tmpdir,  # Windows临时目录
                    "TEMP": tmpdir,  # Windows临时目录
                    "TMPDIR": tmpdir  # Unix风格临时目录
                }
            )

            if compile_result.returncode != 0:
                return jsonify({
                    'error': 'Compilation failed',
                    'message': compile_result.stderr
                }), 400

            for input in inputs:
                if not input.strip():
                    print("shouldn't reach here 输入有空行！")
                    continue

                # 运行
                process = subprocess.run(
                    exe_file,
                    input=input.encode('utf-8'),
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    timeout=3,
                    shell=True
                )

                if process.returncode != 0:
                    return jsonify({
                        'error': 'Runtime error',
                        'message': process.stderr.decode('utf-8', errors='replace')
                    }), 400

                outputs.append(process.stdout.decode('utf-8', errors='replace').rstrip('\r\n'))

            return jsonify({
                'outputs': outputs
            })

        except subprocess.TimeoutExpired:
            return jsonify({
                'error': 'Timeout',
                'message': 'Execution exceeded 3 seconds'
            }), 400
        except Exception as e:
            return jsonify({
                'error': 'Server error',
                'message': f"{str(e)} (你安装g++并配置环境变量了吗？)"
            }), 500

@app.route('/run_tests', methods=['POST'])
def run_tests():
    try:
        backend_dir = os.path.abspath(
            os.path.join(os.path.dirname(__file__), '..', '..', 'chai-grouping-backend')
        )
        if not os.path.isdir(backend_dir):
            raise FileNotFoundError(f"后端目录不存在：{backend_dir}")

        # 优先使用 mvnw.cmd；如果不存在，再退回到全局 mvn
        mvnw = os.path.join(backend_dir, 'mvnw.cmd')
        if os.path.isfile(mvnw):
            cmd = [mvnw, 'test']
        else:
            cmd = ['mvn', 'test']

        result = subprocess.run(
            cmd,
            cwd=backend_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )

        passed = []
        failed = []
        report_dir = os.path.join(backend_dir, 'target', 'surefire-reports')
        if os.path.isdir(report_dir):
            for file in os.listdir(report_dir):
                if file.startswith('TEST-') and file.endswith('.xml'):
                    path = os.path.join(report_dir, file)
                    try:
                        tree = ET.parse(path)
                        root = tree.getroot()
                        for case in root.findall('testcase'):
                            name = f"{case.get('classname')}.{case.get('name')}"
                            if case.find('failure') is not None or case.find('error') is not None:
                                failed.append(name)
                            else:
                                passed.append(name)
                    except Exception:
                        pass

        return jsonify({
            'exitCode': result.returncode,
            'output': result.stdout,
            'passed': passed,
            'failed': failed
        })
    except Exception as e:
        app.logger.error("运行测试时报错:\n" + traceback.format_exc())
        return jsonify({'error': str(e)}), 500



@app.route('/run_systest', methods=['GET'])
def run_systest():
    headed = request.args.get('headed', 'false').lower() == 'true'

    cwd = "D:/data/code/chai-grouping-frontend"
    project_path = os.path.join(cwd, "cypress-sys")

    command = [
        "npx", "cypress", "run",
        "--project", cwd,
        "--config-file", os.path.join(project_path, "cypress.config.js"),
        "--spec", os.path.join(project_path, "e2e/*.cy.js"),
        "--reporter", "spec"
    ]

    if headed:
        command.append("--headed")

    def generate():
        env = os.environ.copy()
        env['PYTHONIOENCODING'] = 'utf-8'

        process = subprocess.Popen(
            command,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            encoding='utf-8',
            env=env,
            shell=True
        )

        current_case = None
        emitted_cases = {}

        for line in iter(process.stdout.readline, ''):
            line = line.strip()
            print("[Cypress]", line)

            # 匹配测试用例标题行（行首 + 空格 + "-"）
            match_case = re.match(r"^([A-Za-z0-9_]+)\s+-\s+.*$", line)
            if match_case:
                current_case = match_case.group(1)
                continue

            # 匹配通过（✓ 开头）
            if line.startswith("√ ") and current_case and current_case not in emitted_cases:
                emitted_cases[current_case] = "PASSED"
                yield f"data: [{current_case}] PASSED\n\n"
                continue

            # 匹配失败（例如 "1) xxx"）
            if re.match(r"^\d+\)", line) and current_case and current_case not in emitted_cases:
                emitted_cases[current_case] = "FAILED"
                yield f"data: [{current_case}] FAILED\n\n"
                continue

        process.stdout.close()
        yield "data: [Cypress Finished]\n\n"

    return Response(stream_with_context(generate()), mimetype='text/event-stream')


if __name__ == '__main__':
    # 确保临时目录存在
    if not os.path.exists(TEMP_DIR):
        os.makedirs(TEMP_DIR)
    app.run(host='0.0.0.0', port=5001, debug=True)
