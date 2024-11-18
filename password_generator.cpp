#include <iostream>
#include <random>
using namespace std;

/**
 * Programma per generare password sicure con lunghezza casuale tra 8 e 50 caratteri.
 * Utilizza lettere maiuscole, minuscole, numeri e simboli speciali.
 */

int main() {
    string charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_!@.&%";
    string password;
    random_device rd;
    uniform_int_distribution<int> dist(0, charset.size() - 1);
    uniform_int_distribution<int> length_dist(8, 50); 

    int password_length = length_dist(rd); 

    for (int i = 0; i < password_length; i++) { 
        password += charset[dist(rd)]; 
    }

    cout << "Password generata: " << password << "\n";
    return 0;
}
