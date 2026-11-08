# DIO Agent — Especialização em Segurança (GuardiAI)

Projeto final do bootcamp de cibersegurança da DIO. Especializa o DIO Agent como mentor de segurança de aplicações (AppSec), adicionando uma nova skill de análise de vulnerabilidades e um perfil didático para ensinar segurança sem entregar exploits prontos.

## O que foi feito

Este projeto parte do [DIO Agent](https://github.com/digitalinnovationone/dio-agent) — um agente de mentoria para estudantes da plataforma — e adiciona:

### Nova skill: Análise de Vulnerabilidades

**Arquivo:** `skills/vulnerability-analysis/SKILL.md`

Quando o estudante compartilha código com suspeita de falha de segurança, o agente conduz uma análise estruturada em 7 etapas:

1. Entende o contexto (ambiente, exposição, dados)
2. Identifica a vulnerabilidade e explica o mecanismo
3. Classifica o risco (impacto × probabilidade = severidade)
4. Referencia o MITRE ATT&CK quando aplicável
5. Orienta a correção com exemplo mínimo
6. Valida a correção aplicada pelo estudante
7. Amplia a visão com medidas defensivas complementares

A skill nunca entrega exploit funcional. O objetivo é o estudante entender a falha, não apenas corrigi-la.

### Base de conhecimento de segurança

**Arquivo:** `agent/knowledge/security-basics.md`

Fundamentos que o agente usa para contextualizar análises:
- Tríade CIA (Confidencialidade, Integridade, Disponibilidade)
- Vulnerabilidade vs Ameaça vs Risco
- OWASP Top 10 com exemplos de código (vulnerável × seguro)
- MITRE ATT&CK — táticas e técnicas relevantes para AppSec
- Boas práticas de desenvolvimento seguro

### Persona GuardiAI

**Arquivo:** `agent/persona.md`

Quando o contexto envolve segurança, o DIO Agent adota o perfil GuardiAI: mesmo cuidado pedagógico, postura objetiva de quem avalia risco de verdade. Sempre pergunta o contexto antes de concluir. Recusa análises de sistemas que o estudante não controla.

## Aplicações de demonstração

A pasta `tests/` contém dois servidores HTTP didáticos em Python que ilustram a vulnerabilidade central do bootcamp: SQL Injection.

### app.py — Versão vulnerável

```bash
python tests/app.py
# Servidor em http://localhost:8080
```

Demonstra a concatenação de input do usuário diretamente na query SQL.

Payloads para testar:
```
# Bypass de autenticação (ignora a senha):
http://localhost:8080?username=admin'%20--&password=qualquer

# Login com credenciais corretas (funciona normalmente):
http://localhost:8080?username=admin&password=senha_secreta
```

A query vulnerável exibe no terminal:
```
[VULNERÁVEL] Query executada: SELECT * FROM users WHERE username='admin' --' AND password='qualquer'
```

O `--` comenta o resto da query. A verificação de senha é ignorada.

### app_secure.py — Versão segura

```bash
python tests/app_secure.py
# Servidor em http://localhost:8081
```

Mesma funcionalidade. Uma mudança: consulta parametrizada substitui a interpolação de string.

```python
# Vulnerável
query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"

# Seguro
cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
```

O mesmo payload de bypass agora falha — o driver trata o input como dado, não como SQL.

## Estrutura do projeto

```
cyber3/
├── AGENTS.md                          # Fonte única de verdade do agente (atualizado)
├── CLAUDE.md                          # Ponto de entrada para o Claude Code
├── agent/
│   ├── persona.md                     # Perfil do agente (atualizado com GuardiAI)
│   └── knowledge/
│       ├── dio-platform.md            # Conhecimento original da DIO
│       ├── learning-experiences.md    # Tipos de experiência da DIO
│       └── security-basics.md        # NOVO: fundamentos de segurança
├── skills/
│   ├── vulnerability-analysis/        # NOVA skill
│   │   ├── SKILL.md                   # Processo de análise para o agente
│   │   └── README.md                  # Documentação para humanos
│   └── [skills originais do DIO Agent]
└── tests/
    ├── app.py                         # NOVO: login vulnerável a SQL Injection
    └── app_secure.py                  # NOVO: versão corrigida com query parametrizada
```

## Conceitos abordados

- **SQL Injection** — OWASP A03, MITRE T1190
- **Consultas parametrizadas** — a correção correta
- **Classificação de risco** — impacto × probabilidade × contexto
- **MITRE ATT&CK** — framework de táticas e técnicas de ataque
- **OWASP Top 10** — vulnerabilidades mais críticas em aplicações web
- **Padrão AGENTS.md** — como especializar um agente de IA com skills e knowledge

## Como usar o agente

Abra a pasta `cyber3/` no Claude Code. O arquivo `CLAUDE.md` carrega o `AGENTS.md` automaticamente, ativando o DIO Agent com a especialização em segurança.

Exemplos de prompt para acionar a skill de análise:

```
Olha esse código de login que fiz. Isso é seguro?

Quero entender como SQL Injection funciona na prática.

Revisei meu código mas não sei se ainda tem alguma vulnerabilidade.
```

O agente vai perguntar o contexto antes de qualquer análise.
