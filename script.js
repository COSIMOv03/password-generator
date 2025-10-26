let isVerified = false;

// Callback Cloudflare Turnstile
function onTurnstileSuccess(token) {
    isVerified = true;
    console.log("✅ Turnstile completato:", token);
}

// Generatore password
function generatePassword() {
    if (!isVerified) {
        alert("⚠️ Completa la verifica di sicurezza prima di generare la password.");
        return;
    }

    const length = parseInt(document.getElementById('lp-pg-password-length').value, 10);
    const includeUppercase = document.getElementById('lp-pg-uppercase').checked;
    const includeLowercase = document.getElementById('lp-pg-lowercase').checked;
    const includeNumbers = document.getElementById('lp-pg-numbers').checked;
    const includeSymbols = document.getElementById('lp-pg-symbols').checked;
    const style = document.querySelector('input[name="encryption-style"]:checked').value;

    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "_!@.&%?#$";

    if (style === "easy-to-say") charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    else if (style === "easy-to-read") charset = charset.replace(/[l1O0]/g, "");

    let password = "";
    for (let i = 0; i < length; i++) {
        const randIndex = Math.floor(Math.random() * charset.length);
        password += charset[randIndex];
    }

    document.getElementById('generatedPassword').innerText = password;
}

// --- Checker password ---
async function getPwnedPasswordInfo(password) {
    const sha1Hash = await sha1(password);
    const hashPrefix = sha1Hash.substring(0, 5);
    const hashSuffix = sha1Hash.substring(5);

    fetch(`https://api.pwnedpasswords.com/range/${hashPrefix}`)
        .then(response => response.text())
        .then(data => {
            const regex = new RegExp(`${hashSuffix.toUpperCase()}:`, 'g');
            const matches = data.match(regex);
            const result = matches ? matches.length : 0;

            const resultEl = document.getElementById('result');
            if (result > 0) {
                resultEl.innerHTML = `⚠️ Attenzione: La tua password è stata compromessa ${result} volta/e!`;
                resultEl.classList.add('unsafe');
                resultEl.classList.remove('safe');
            } else {
                resultEl.innerHTML = '🔒 La tua password sembra sicura!';
                resultEl.classList.add('safe');
                resultEl.classList.remove('unsafe');
            }

            estimateCrackTime(password);
        })
        .catch(err => {
            console.error(err);
            document.getElementById('result').innerHTML = 'Errore nel controllo della password.';
        });
}

async function sha1(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function estimateCrackTime(password) {
    let time = '0 secondi';
    if (password.length < 6) time = 'Immediato';
    else if (password.length < 8) time = 'Pochi secondi';
    else if (password.length < 10) time = 'Pochi minuti';
    else if (password.length < 12) time = 'Poche ore';
    else time = 'Pochi giorni';

    document.getElementById('first_estimate').innerHTML = `<h1>${time}</h1>`;
}

function checkPassword() {
    const password = document.getElementById('password').value;
    if (password) getPwnedPasswordInfo(password);
    else {
        document.getElementById('result').innerHTML = '';
        document.getElementById('first_estimate').innerHTML = '<h1>0 secondi</h1>';
    }
}
