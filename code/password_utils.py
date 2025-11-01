import random, string

def generate_password(length=16):
    charset = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(charset) for _ in range(length))

def check_strength(password):
    score = 0
    if len(password) >= 12: score += 1
    if any(c.isupper() for c in password): score += 1
    if any(c.islower() for c in password): score += 1
    if any(c.isdigit() for c in password): score += 1
    if any(c in string.punctuation for c in password): score += 1
    return score, ["Debole", "Media", "Buona", "Forte", "Molto forte"][min(score-1, 4)]
