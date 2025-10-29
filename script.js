// ---------- Testo dinamico Parrot OS style ----------
const words = ["sicurezza", "forza", "affidabilità", "protezione", "privacy"];
const animatedText = document.querySelector(".animated-text");
let wordIndex=0, charIndex=0, forward=true;

function typeEffect(){
    const current = words[wordIndex];
    if(forward){
        charIndex++;
        if(charIndex>current.length){forward=false; setTimeout(typeEffect,1000); return;}
    } else {
        charIndex--;
        if(charIndex<0){forward=true; wordIndex=(wordIndex+1)%words.length; setTimeout(typeEffect,200); return;}
    }
    animatedText.textContent=current.slice(0,charIndex);
    setTimeout(typeEffect,150);
}
typeEffect();

// ---------- Generatore password live ----------
const lengthSlider = document.getElementById('password-length');
const lengthValue = document.getElementById('length-value');
const genPasswordEl = document.getElementById('generatedPassword');

lengthSlider.addEventListener('input', ()=>{
    lengthValue.innerText=lengthSlider.value;
    generatePassword();
});

const controls = document.querySelectorAll('#generator input');
controls.forEach(ctrl => ctrl.addEventListener('input', generatePassword));

function generatePassword(){
    const length=parseInt(lengthSlider.value);
    const includeUppercase=document.getElementById('uppercase').checked;
    const includeLowercase=document.getElementById('lowercase').checked;
    const includeNumbers=document.getElementById('numbers').checked;
    const includeSymbols=document.getElementById('symbols').checked;
    const excludeAmbiguous=document.getElementById('exclude-ambiguous').checked;
    const style=document.querySelector('input[name="style"]:checked').value;

    let charset="";
    if(includeUppercase) charset+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(includeLowercase) charset+="abcdefghijklmnopqrstuvwxyz";
    if(includeNumbers) charset+="0123456789";
    if(includeSymbols) charset+="_!@.&%?#$";

    if(style==="easy-to-say") charset="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    else if(style==="easy-to-read") charset=charset.replace(/[l1O0]/g,"");
    if(excludeAmbiguous) charset=charset.replace(/[l1O0]/g,"");

    let password="";
    for(let i=0;i<length;i++) password+=charset.charAt(Math.floor(Math.random()*charset.length));

    genPasswordEl.innerText=password;
}

// Copia password
document.getElementById('copy-btn').addEventListener('click',()=>{
    const pwd=genPasswordEl.innerText;
    if(pwd){navigator.clipboard.writeText(pwd); alert('✅ Password copiata!');}
});

// ---------- Verifica password ----------
document.getElementById('check-btn').addEventListener('click', checkPassword);
document.getElementById('password').addEventListener('input', checkPassword);

async function checkPassword(){
    const password=document.getElementById('password').value;
    const resultEl=document.getElementById('result');
    const estimateEl=document.getElementById('first_estimate');
    if(!password){resultEl.innerHTML=''; estimateEl.innerHTML='<h1>0 secondi</h1>'; return;}

    // Stima crack tempo
    let time='0 secondi';
    if(password.length<6) time='Immediato';
    else if(password.length<8) time='Pochi secondi';
    else if(password.length<10) time='Pochi minuti';
    else if(password.length<12) time='Poche ore';
    else time='Pochi giorni';
    estimateEl.innerHTML=`<h1>${time}</h1>`;

    try{
        const sha1Hash=await sha1(password);
        const prefix=sha1Hash.slice(0,5);
        const suffix=sha1Hash.slice(5);
        const res=await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const text=await res.text();
        const regex=new RegExp(`${suffix.toUpperCase()}:`,'g');
        const matches=text.match(regex);
        const count=matches?matches.length:0;
        resultEl.innerHTML=count>0?`⚠️ La password è stata compromessa ${count} volte!`:`✅ Password sicura!`;
        resultEl.className=count>0?'unsafe':'safe';
    } catch(e){ console.log(e); resultEl.innerHTML='Errore nel controllo'; }
}

// SHA1 helper
async function sha1(msg){
    const buf=await crypto.subtle.digest("SHA-1", new TextEncoder().encode(msg));
    return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

// Genera subito la password iniziale
generatePassword();
