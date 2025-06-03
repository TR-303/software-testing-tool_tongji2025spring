import os
import subprocess
import tempfile
from flask import Flask, request, jsonify
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


if __name__ == '__main__':
    # 确保临时目录存在
    if not os.path.exists(TEMP_DIR):
        os.makedirs(TEMP_DIR)
    app.run(host='0.0.0.0', port=5001, debug=True)
