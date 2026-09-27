# 🐳 Apache + Docker Compose

Projeto do desafio **"Executando uma Aplicação HTML em um Container Apache com Docker Compose"** (Bootcamp DIO), reescrito seguindo práticas atuais de Docker.

## O que mudou em relação ao material original

| Original (DIO) | Nesta versão |
|---|---|
| `version: '3.9'` (campo obsoleto) | Sem campo `version` (Compose V2) |
| `image: httpd:latest` | `image: httpd:2.4-alpine` (versão pinada e leve) |
| Sem healthcheck | `healthcheck` configurado |
| Sem política de restart | `restart: unless-stopped` |
| Porta `80:80` (pode conflitar no host) | Porta `8080:80` |
| Volume de leitura/escrita | Volume `:ro` (somente leitura) |
| "Hello World" simples | Página responsiva com HTML/CSS/JS, dark mode e relógio |
| Sem alternativa de imagem própria | `Dockerfile` opcional para build de imagem imutável |

## 📁 Estrutura

```
docker_compose_apache/
├── docker-compose.yml     # sobe o Apache montando ./website como volume
├── Dockerfile              # alternativa: builda uma imagem com o site "dentro"
├── .gitignore
├── README.md
└── website/
    ├── index.html
    ├── css/style.css
    └── js/script.js
```

## ▶️ Como rodar (modo desenvolvimento — bind mount)

```bash
docker compose up -d
```

Acesse: http://localhost:8080

Para editar o site, basta alterar os arquivos em `website/` — como o volume está montado, as mudanças aparecem só dando refresh no navegador (sem precisar rebuildar nada).

Para parar:

```bash
docker compose down
```

## 🏗️ Como rodar (modo "produção" — imagem própria)

```bash
docker build -t meu-site-apache .
docker run -d -p 8080:80 --name meu-site meu-site-apache
```

Aqui o conteúdo do site fica **dentro da imagem**, o que é mais adequado para publicar em um registry (Docker Hub, GHCR etc.) e implantar em outro ambiente.

## ✅ Verificando a saúde do container

```bash
docker ps
docker inspect --format='{{json .State.Health}}' apache-web-app
```

## Pré-requisitos

- Docker e Docker Compose v2 instalados
- Nenhuma outra aplicação usando a porta 8080 localmente

## Próximos passos possíveis

- Adicionar HTTPS com um reverse proxy (Traefik/Nginx + Let's Encrypt)
- Publicar a imagem em um registry e usar em CI/CD (GitHub Actions)
- Trocar o Apache por Nginx como exercício comparativo

---
Desafio de Projeto — Bootcamp DIO • Instrutor: Denilson Bonatti
