# 🦜 Password Generator

A lightweight, local, and open-source password generator written in Python.  
It focuses on **privacy**, **simplicity**, and **security** — all running locally on your machine without sending or storing any data.

---

## ⚙️ How Does It Work?

1. **Random Password Generation:**  
   The program generates a random password using Python’s built-in `random` and `string` libraries.  
   It constructs the password from a predefined character set consisting of:
   - Uppercase and lowercase letters  
   - Digits  
   - Special symbols  

   The password length can be chosen by the user (between 8 and 50 characters).

2. **Matrix-Like Effect:**  
   During the password generation process, a “Matrix-style” scrolling effect is displayed for 10 seconds to make the experience more engaging.

3. **No Data Storage:**  
   The program **does not store or log any passwords**, ensuring that sensitive data is never retained anywhere.

4. **Decentralized Security:**  
   Passwords are generated **locally**, minimizing the risk of centralized data breaches.

5. **User-Centric Design:**  
   Security and privacy are prioritized throughout the design, keeping user data **fully private and secure**.

---

## 🧰 Upgrade Your Terminal

Before running the program, make sure your system is up to date and that the necessary tools are installed.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install git
sudo apt install python3
🚀 Execution and Installation

Clone the repository:

git clone https://github.com/COSIMOv03/password-generator.git


Move into the project directory:

cd password-generator


Run the generator:

python3 password_generator.py

MIT License

Copyright (c) 2025 COSIMOv03

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
