// ---------------- TITLE DYNAMIC PARROT STYLE ----------------
const words = ["ParrotPass", "Security Suite", "Cyber Defense", "Open Freedom", "Password Lab"];
const titleDynamic = document.querySelector(".title-dynamic");
let wIndex = 0, cIndex = 0, forward = true;

function typeTitle() {
  const current = words[wIndex];
  if (forward) {
    cIndex++;
    if (cIndex > current.length) { forward = false; setTimeout(typeTitle, 1000); return; }
  } else {
    cIndex--;
    if (cIndex < 0) { forward = true; wIndex = (wIndex + 1) % words.length; setTimeout(typeTitle, 250); return; }
  }
  titleDynamic.textContent = current.slice(0, cIndex);
  setTimeout(typeTitle, 120);
}
typeTitle();

// ---------------- PASSWORD GENERATION ----------------
const lengthSlider = document.getElementById('password-length');
const lengthValue = document.getElementById('length-value');
const genPasswordEl = document.getElementById('generatedPassword');

lengthSlider.addEventListener('input', () => {
  lengthValue.innerText = lengthSlider.value;
  generatePassword();
});

document.querySelectorAll('#generator input').forEach(e => e.addEventListener('input', generatePassword));

function generatePassword() {
  const length = parseInt(lengthSlider.value);
  const includeUppercase = document.getElementById('uppercase').checked;
  const includeLowercase = document.getElementById('lowercase').checked;
  const includeNumbers = document.getElementById('numbers').checked;
  const includeSymbols = document.getElementById('symbols').checked;
  const excludeAmbiguous = document.getElementById('exclude-ambiguous').checked;
  const style = document.querySelector('input[name="style"]:checked').value;

  let charset = "";
  if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) charset += "0123456789";
  if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (style === "easy-to-say") charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (style === "easy-to-read") charset = charset.replace(/[l1O0]/g, "");
  if (excludeAmbiguous) charset = charset.replace(/[l1O0]/g, "");

  let password = "";
  for (let i = 0; i < length; i++) password += charset.charAt(Math.floor(Math.random() * charset.length));

  genPasswordEl.innerText = password;
}
generatePassword();

document.getElementById('copy-btn').addEventListener('click', () => {
  const pwd = genPasswordEl.innerText;
  if (pwd) {
    navigator.clipboard.writeText(pwd);
    alert('✅ Password copiata!');
  }
});

// ---------------- PASSWORD CHECK ----------------
document.getElementById('check-btn').addEventListener('click', checkPassword);
document.getElementById('password').addEventListener('input', checkPassword);

async function checkPassword() {
  const password = document.getElementById('password').value;
  const resultEl = document.getElementById('result');
  const estimateEl = document.getElementById('first_estimate');
  if (!password) {
    resultEl.innerHTML = '';
    estimateEl.innerHTML = '<h1>0 secondi</h1>';
    return;
  }

  // Stima di base
  let time = "0 secondi";
  if (password.length < 6) time = "Immediato";
  else if (password.length < 8) time = "Pochi secondi";
  else if (password.length < 10) time = "Pochi minuti";
  else if (password.length < 12) time = "Poche ore";
  else time = "Pochi giorni";
  estimateEl.innerHTML = `<h1>${time}</h1>`;

  try {
    const sha1Hash = await sha1(password);
    const prefix = sha1Hash.slice(0, 5);
    const suffix = sha1Hash.slice(5);
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await res.text();
    const regex = new RegExp(`${suffix.toUpperCase()}:`, 'g');
    const matches = text.match(regex);
    const count = matches ? matches.length : 0;
    resultEl.innerHTML = count > 0
      ? `⚠️ Password compromessa ${count} volte!`
      : `✅ Password sicura!`;
    resultEl.className = count > 0 ? 'unsafe' : 'safe';
  } catch (e) {
    resultEl.innerHTML = 'Errore nel controllo';
  }
}

async function sha1(msg) {
  const buf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(msg));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// ---------------- LOCAL FORUM ----------------
const postBtn = document.getElementById("post-comment");
const input = document.getElementById("comment-input");
const comments = document.getElementById("comments");

postBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    const div = document.createElement("div");
    div.classList.add("comment");
    div.innerText = text;
    comments.prepend(div);
    input.value = "";
  }
});
