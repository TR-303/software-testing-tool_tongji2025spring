import mysql.connector
import json
from .config import HOST, USER, PASSWORD, DATABASE, LOAD_FILE_DIR

def clear_database():
    print("正在清空系统测试数据库...")
    conn = mysql.connector.connect(
        host=HOST, user=USER, password=PASSWORD, database=DATABASE
    )
    cursor = conn.cursor()
    cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
    tables = [
        "notification", "submission", "task", "join_request",
        "membership", "group", "user"
    ]
    for table in tables:
        cursor.execute(f"DELETE FROM `{table}`;")
        cursor.execute(f"ALTER TABLE `{table}` AUTO_INCREMENT = 1;")
    # cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")
    conn.commit()
    cursor.close()
    conn.close()
    print("系统测试数据库初始化完成")

def insert_users():
    conn = mysql.connector.connect(
        host=HOST, user=USER, password=PASSWORD, database=DATABASE
    )
    cursor = conn.cursor()
    with open(LOAD_FILE_DIR + "test_users.json", "r", encoding="utf-8") as f:
        users = json.load(f)
    for user in users.values():
        user_id = user["id"]
        username = user["username"]
        encodedPassword = user["encodedPassword"]
        sql = """
            INSERT INTO user (user_id, username, password)
            VALUES (%s, %s, %s)
            ON DUPLICATE KEY UPDATE username = VALUES(username), password = VALUES(password)
        """
        cursor.execute(sql, (user_id, username, encodedPassword))
    conn.commit()
    cursor.close()
    conn.close()


def insert_test_group():
    conn = mysql.connector.connect(
        host=HOST, user=USER, password=PASSWORD, database=DATABASE
    )
    cursor = conn.cursor()
    with open(LOAD_FILE_DIR + "test_group.json", "r", encoding="utf-8") as f:
        groups = json.load(f)
    for group in groups:
        # 插入小组
        cursor.execute(
            "INSERT INTO `group` (group_id, name, description, creation_date, volume, visibility, approval_required, disbanded, leader_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (
                group.get("group", 1),
                group.get("name", "Gp1"),
                group.get("description", ""),
                group.get("creation_date", "2000-01-01"),
                group.get("volume", 4),
                group.get("visibility", 1),
                group.get("approval_required", 1),
                group.get("disbanded", 0),
                group.get("leader_id", 1)
            )
        )
        # 插入组员（组长）
        cursor.execute(
            "INSERT INTO membership (group_id, user_id, join_date) VALUES (%s, %s, %s)",
            (group.get("group", 1), group.get("leader_id", 1), group.get("creation_date", "2000-01-01"))
        )
    conn.commit()
    cursor.close()
    conn.close()

def insert_memberships():
    """
    批量插入 membership 表，数据来源 test_membership.json
    """
    conn = mysql.connector.connect(
        host=HOST, user=USER, password=PASSWORD, database=DATABASE
    )
    cursor = conn.cursor()
    with open(LOAD_FILE_DIR + "test_membership.json", "r", encoding="utf-8") as f:
        memberships = json.load(f)
    for m in memberships:
        sql = """
            INSERT INTO membership (group_id, user_id, join_date)
            VALUES (%s, %s, %s)
            ON DUPLICATE KEY UPDATE join_date = VALUES(join_date)
        """
        cursor.execute(sql, (m["group_id"], m["user_id"], m["join_date"]))
    conn.commit()
    cursor.close()
    conn.close()


