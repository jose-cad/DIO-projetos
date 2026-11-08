# Fundamentos de Segurança da Informação

Este arquivo contém os conceitos fundamentais que o GuardiAI usa para analisar vulnerabilidades, classificar riscos e orientar estudantes em segurança de aplicações.

## Conceitos Essenciais

### Vulnerabilidade

Uma vulnerabilidade é uma fraqueza em um sistema, aplicação ou processo que pode ser explorada para causar dano. Ela existe independentemente de alguém a explorar — uma porta aberta continua sendo uma vulnerabilidade mesmo que ninguém a use.

Exemplos: senha armazenada em texto plano, consulta SQL construída com input do usuário, porta de administração exposta na internet.

### Ameaça

Uma ameaça é qualquer agente ou evento capaz de explorar uma vulnerabilidade. Pode ser um atacante externo, um funcionário mal-intencionado, ou até um erro acidental.

A ameaça sozinha não causa dano — ela precisa encontrar uma vulnerabilidade para ser efetiva.

### Risco

Risco é a combinação de vulnerabilidade, ameaça e impacto:

```
Risco = Probabilidade de exploração × Impacto potencial
```

Um servidor com SQL Injection exposto na internet tem risco alto. O mesmo código num ambiente de laboratório isolado tem risco baixo — a vulnerabilidade é a mesma, o contexto mudou o risco.

---

## A Tríade CIA

Todo sistema de segurança protege três propriedades fundamentais:

### Confidencialidade

Garantia de que a informação é acessível apenas a quem tem autorização.

Quebrada por: vazamento de dados, SQL Injection que expõe o banco, credenciais expostas, acesso não autorizado.

Medidas: criptografia, controle de acesso, autenticação forte, princípio do menor privilégio.

### Integridade

Garantia de que a informação não foi alterada de forma não autorizada.

Quebrada por: injeção de dados maliciosos, modificação de registros, adulteração de logs, XSS que altera o DOM.

Medidas: validação de entrada, checksums, assinaturas digitais, controle de versão com auditoria.

### Disponibilidade

Garantia de que o sistema está acessível quando necessário.

Quebrada por: ataques de negação de serviço (DoS/DDoS), falhas de infraestrutura, erros que derrubam o serviço.

Medidas: redundância, rate limiting, monitoramento, planos de resposta a incidentes.

---

## Vulnerabilidades Mais Comuns (OWASP Top 10)

O OWASP Top 10 é uma lista das vulnerabilidades mais críticas em aplicações web, mantida pela Open Web Application Security Project.

### A01 — Broken Access Control

Usuários conseguem acessar recursos ou executar ações além das suas permissões.

Exemplo: usuário comum acessa `/admin` sem restrição, ou altera o ID na URL e acessa dados de outro usuário (IDOR).

Correção: verificar permissões no servidor, nunca confiar no cliente para controle de acesso.

### A02 — Cryptographic Failures

Dados sensíveis expostos por falha ou ausência de criptografia.

Exemplo: senhas em texto plano no banco, comunicação HTTP sem TLS, tokens de sessão sem expiração.

Correção: HTTPS obrigatório, hashing com bcrypt/argon2 para senhas, nunca armazenar dados sensíveis desnecessariamente.

### A03 — Injection

Dados fornecidos pelo usuário são interpretados como código pelo sistema.

**SQL Injection** — o mais comum em aplicações com banco de dados:
```python
# VULNERÁVEL — input vira parte da query
query = f"SELECT * FROM users WHERE username='{username}'"

# SEGURO — consulta parametrizada
cursor.execute("SELECT * FROM users WHERE username=?", (username,))
```

**Command Injection** — input vira comando do sistema operacional:
```python
# VULNERÁVEL
os.system(f"ping {host}")

# SEGURO
subprocess.run(["ping", host], capture_output=True)
```

Correção: sempre usar consultas parametrizadas, nunca concatenar input do usuário em comandos ou queries.

### A05 — Security Misconfiguration

Configurações padrão inseguras, funcionalidades desnecessárias ativas, mensagens de erro detalhadas expostas.

Exemplo: modo debug ativo em produção, credenciais padrão não alteradas, CORS configurado como `*`.

### A07 — Identification and Authentication Failures

Falhas na autenticação que permitem assumir identidades de outros usuários.

Exemplo: senhas fracas sem política, sem limite de tentativas de login, tokens de sessão previsíveis.

---

## MITRE ATT&CK

O MITRE ATT&CK é um framework que cataloga táticas e técnicas usadas por atacantes reais, baseado em observações do mundo real. É amplamente usado por equipes de segurança para entender, detectar e responder a ataques.

**Táticas** são os objetivos do atacante (Initial Access, Execution, Persistence, etc.).

**Técnicas** são os métodos usados para atingir esses objetivos.

Técnicas relevantes para vulnerabilidades de aplicação:

| Técnica | ID | Descrição |
|---|---|---|
| Exploit Public-Facing Application | T1190 | Explorar falhas em aplicações expostas (SQL Injection, RCE) |
| Valid Accounts | T1078 | Usar credenciais legítimas obtidas por vazamento ou força bruta |
| Unsecured Credentials | T1552 | Credenciais em código fonte, variáveis de ambiente, arquivos de config |
| Command and Scripting Interpreter | T1059 | Executar código malicioso via script ou shell |
| Impair Defenses | T1562 | Desabilitar logs, antivírus ou mecanismos de segurança |

---

## Boas Práticas de Desenvolvimento Seguro

**Validação de entrada**
Nunca confie no que o usuário envia. Valide tipo, formato, tamanho e conteúdo na camada de entrada — antes de qualquer processamento.

**Princípio do menor privilégio**
Cada componente deve ter acesso apenas ao que precisa. O usuário do banco de dados de uma aplicação web raramente precisa de permissão para dropar tabelas.

**Segredos fora do código**
Senhas, chaves de API e tokens nunca no código-fonte. Usar variáveis de ambiente ou cofres de segredos (Vault, AWS Secrets Manager).

**Logs sem dados sensíveis**
Registrar eventos de segurança (tentativas de login, erros de autenticação), mas nunca logar senhas, tokens ou dados pessoais.

**Dependências atualizadas**
Vulnerabilidades em bibliotecas são tão perigosas quanto no código próprio. Manter dependências atualizadas e monitorar CVEs.

**HTTPS sempre**
Sem exceção para qualquer aplicação que processe dados de usuário.

**Headers de segurança HTTP**
```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000
```
