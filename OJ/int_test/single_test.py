import requests
import jwt
import datetime
import json
import os
from .db_preparations import clear_database, insert_users, insert_test_group
from .config import BASE_URL, SECRET_KEY, CASES_DIR


def generate_token(user_id, expired=False):
    if expired:
        exp = datetime.datetime.now() - datetime.timedelta(hours=100)  # 已过期
    else:
        exp = datetime.datetime.now() + datetime.timedelta(hours=1)  # 有效
    payload = {"userId": user_id, "exp": exp}
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    return token

def run_cases(json_path):
    results = []
    with open(json_path, 'r', encoding='utf-8') as f:
        cases = json.load(f)
    for case in cases:
        headers = case.get('headers', {}).copy()
        token_type = case.get('token_type')
        user_id = case.get('user_id', 1)  # 默认1，可在用例中指定
        if token_type == "valid":
            token = generate_token(user_id, expired=False)
            headers['Authorization'] = f'Bearer {token}'
        elif token_type == "expired":
            token = generate_token(user_id, expired=True)
            headers['Authorization'] = f'Bearer {token}'
        url = BASE_URL + case['url']
        resp = requests.request(case['method'], url, headers=headers, json=case.get('body'))
        expected_status = case.get('expected_status', 200)
        try:
            resp_content = resp.json()
        except json.JSONDecodeError:
            resp_content = resp.text
        result = {
            "desc": case.get('desc', ''),
            "user_id": user_id,
            "request": {
                "method": case['method'],
                "url": url,
                "headers": headers,
                "body": case.get('body')
            },
            "expected_status": expected_status,
            "actual_status": resp.status_code,
            "response": resp_content,
            "result": "通过" if resp.status_code == expected_status else "失败"
        }
        results.append(result)
    print(json.dumps(results, ensure_ascii=False, indent=2))
    return results


if __name__ == "__main__":
    clear_database()
    insert_users()
    insert_test_group()
    run_cases(CASES_DIR+"IT_API_001_001.json")