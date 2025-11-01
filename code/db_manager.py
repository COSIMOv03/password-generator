import sqlite3
from datetime import datetime

def init_db():
    conn = sqlite3.connect("passwords.db")
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS accounts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    site TEXT NOT NULL,
                    username TEXT NOT NULL,
                    password BLOB NOT NULL,
                    last_updated TEXT NOT NULL
                )''')
    conn.commit()
    conn.close()

def save_password(site, username, password_encrypted):
    conn = sqlite3.connect("passwords.db")
    c = conn.cursor()
    c.execute("INSERT INTO accounts (site, username, password, last_updated) VALUES (?, ?, ?, ?)",
              (site, username, password_encrypted, datetime.now().strftime("%Y-%m-%d")))
    conn.commit()
    conn.close()

def get_all_passwords():
    conn = sqlite3.connect("passwords.db")
    c = conn.cursor()
    c.execute("SELECT site, username, password, last_updated FROM accounts")
    rows = c.fetchall()
    conn.close()
    return rows
