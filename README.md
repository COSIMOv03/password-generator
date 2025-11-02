# 🦜 ParrotPass — Secure Password Generator & Checker
# ParrotPass

**ParrotPass** is an open-source web application designed for **secure password generation** and **password strength verification**.  
It aims to make digital security accessible to everyone by combining **privacy**, **freedom**, and **an elegant, minimalist design**.

---

## Overview

ParrotPass provides users with a simple yet powerful interface to generate strong, customizable passwords and instantly check their security level.  
Unlike many online password tools, ParrotPass runs entirely in the browser — ensuring that no sensitive data is ever transmitted or stored externally.

This project draws inspiration from **Parrot OS**, a Linux distribution focused on security and privacy, and implements similar design and transparency principles.

---

## Main Features

### Secure Password Generator
- Fully client-side password generation.
- Adjustable password length (4–64 characters).
- Optional inclusion of:
  - Uppercase letters  
  - Lowercase letters  
  - Numbers  
  - Symbols
- Option to exclude ambiguous characters (`l`, `1`, `O`, `0`) for improved readability.
- Supports multiple generation styles:
  - **Easy to Say** – generates pronounceable passwords.  
  - **Easy to Read** – excludes confusing characters.  
  - **All Characters** – full randomization for maximum strength.

### Password Strength Checker
- Real-time analysis of password entropy and estimated crack time.  
- Detailed feedback on strength level and suggested improvements.  
- Designed to help users understand how secure their passwords truly are.

### Security and Privacy
- **100% local execution**: all computations occur in the browser; no data leaves the device.  
- **Open-source and auditable**: transparency and trust through public source code.  
- Built with **web security best practices** to minimize vulnerabilities.

### Community Features
- Integrated comment and suggestion system (optional).  
- Users can share ideas, report issues, or discuss security-related topics directly within the app.

---

## Technologies Used

- **HTML5** – semantic and accessible structure  
- **CSS3** – modern, responsive, glassmorphism-inspired user interface  
- **Vanilla JavaScript (ES6)** – no external dependencies or frameworks  
- **Local Storage (optional)** – for saving user preferences  
- Focused on **Cybersecurity** and **Web Security Best Practices**

---

## Project Goals

- Promote awareness of password security and privacy.  
- Offer a reliable, transparent alternative to cloud-based password tools.  
- Encourage open collaboration and community-driven improvement.

---

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/<your-username>/ParrotPass.git
