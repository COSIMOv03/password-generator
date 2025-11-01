import random
import string
import time
import sys

# Caratteri ASCII stampabili (dallo spazio a ~)
charset = ''.join(chr(i) for i in range(32, 127))  # Include tutti i caratteri ASCII

# Funzione per simulare l'effetto di scorrimento verso destra
def print_matrix_effect(duration):
    start_time = time.time()  # Inizia il cronometro
    index = 0  # Inizializza l'indice per la sequenza di caratteri

    while time.time() - start_time < duration:  # Per la durata della simulazione
        # Crea la riga che scorre (completa con spazi vuoti)
        line = ''.join(charset[(index + i) % len(charset)] for i in range(40))
        
        # Stampa la riga, spostando il cursore a sinistra per simulare il movimento verso destra
        sys.stdout.write("\r" + line)  
        sys.stdout.flush()  # Forza l'output subito

        # Avanza l'indice per lo scorrimento
        index += 1
        time.sleep(0.1)  # Pausa per creare l'effetto di scorrimento

    sys.stdout.write("\r" + " " * 40 + "\r")  # Cancella la linea alla fine dell'effetto
    sys.stdout.flush()  # Assicura che il cambiamento sia visibile

# Funzione per ottenere la lunghezza della password da parte dell'utente
def get_password_length():
    while True:
        try:
            length = int(input("Inserisci la lunghezza della password (tra 8 e 50 caratteri): "))
            if 8 <= length <= 50:  # Verifica che la lunghezza sia tra 8 e 50
                return length
            else:
                print("La lunghezza deve essere tra 8 e 50.")
        except ValueError:
            print("Per favore, inserisci un numero valido.")

# Funzione principale
def main():
    # Chiedi all'utente la lunghezza della password
    password_length = get_password_length()
    
    print("Generazione della password in corso...")
    print_matrix_effect(10)  # Esegui l'effetto di scorrimento per 10 secondi

    # Genera la password utilizzando il charset con tutti i caratteri ASCII
    password = ''.join(random.choice(charset) for _ in range(password_length))
    print(f"Password generata: {password}")  # Mostra la password finale

# Avvia il programma
if __name__ == "__main__":
    main()
