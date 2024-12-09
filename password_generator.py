import random
import string
import time
import sys

# Funzione per generare una stringa casuale di lunghezza n
def random_string(length):
    # Include lettere maiuscole, minuscole, numeri e simboli speciali ASCII
    charset = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(charset) for _ in range(length))

# Funzione per simulare il "matrix" con caratteri che scorrono
def scrolling_matrix(duration, length):
    start_time = time.time()
    while time.time() - start_time < duration:
        random_str = random_string(length)  # La lunghezza della stringa casuale corrisponde alla lunghezza della password
        sys.stdout.write("\r" + random_str)  # Scrivi sulla stessa riga per far sembrare che scorri
        sys.stdout.flush()
        time.sleep(0.1)  # Attendi 100ms per far sembrare che scorri
    print()

# Chiedi all'utente la lunghezza della password
def get_password_length():
    while True:
        try:
            length = int(input("Inserisci la lunghezza della password (tra 8 e 50 caratteri): "))
            if length < 8:
                print("La lunghezza minima è 8.")
            elif length > 50:
                print("La lunghezza massima è 50.")
            else:
                return length
        except ValueError:
            print("Per favore, inserisci un numero valido.")

# Main
def main():
    # Chiedi all'utente la lunghezza della password
    password_length = get_password_length()

    # Simula il "matrix" per 10 secondi
    print("Generazione della password in corso...")
    scrolling_matrix(10, password_length)

    # Genera la password
    password = random_string(password_length)

    # Stampa la password generata
    print("Password generata:", password)

if __name__ == "__main__":
    main()
