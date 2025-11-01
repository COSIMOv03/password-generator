from crypto_utils import generate_key, load_key, encrypt_password
from db_manager import init_db, save_password, get_all_passwords
from password_utils import generate_password, check_strength
from datetime import datetime, timedelta
import os

def main():
    if not os.path.exists("key.key"):
        generate_key()
    key = load_key()
    init_db()

    while True:
        print("\n=== ParrotPass ===")
        print("1. Genera e salva nuova password")
        print("2. Mostra tutte le password (decrittate)")
        print("3. Controlla scadenze (90 giorni)")
        print("4. Esci")

        choice = input("Scelta: ")
        if choice == "1":
            site = input("Sito o servizio: ")
            username = input("Username: ")
            password = generate_password()
            score, label = check_strength(password)
            print(f"Password generata: {password} ({label})")

            if score < 3:
                print("⚠️ Password troppo debole, rigenerane un’altra.")
                continue

            encrypted = encrypt_password(password, key)
            save_password(site, username, encrypted)
            print("✅ Password salvata in modo sicuro.")

        elif choice == "2":
            from crypto_utils import decrypt_password
            rows = get_all_passwords()
            for site, user, enc, date in rows:
                print(f"{site} | {user} | {decrypt_password(enc, key)} | Ultimo aggiornamento: {date}")

        elif choice == "3":
            rows = get_all_passwords()
            for site, user, _, date in rows:
                last = datetime.strptime(date, "%Y-%m-%d")
                if datetime.now() - last > timedelta(days=90):
                    print(f"🔁 {site} ({user}) necessita aggiornamento password!")
                else:
                    print(f"✅ {site} ({user}) è aggiornata.")
        elif choice == "4":
            break

if __name__ == "__main__":
    main()
