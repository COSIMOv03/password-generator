from cryptography.fernet import Fernet

def generate_key():
    """Genera e salva una chiave di cifratura"""
    key = Fernet.generate_key()
    with open("key.key", "wb") as key_file:
        key_file.write(key)
    return key

def load_key():
    """Carica la chiave salvata"""
    return open("key.key", "rb").read()

def encrypt_password(password: str, key: bytes) -> bytes:
    f = Fernet(key)
    return f.encrypt(password.encode())

def decrypt_password(token: bytes, key: bytes) -> str:
    f = Fernet(key)
    return f.decrypt(token).decode()
