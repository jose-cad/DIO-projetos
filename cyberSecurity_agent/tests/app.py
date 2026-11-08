"""
Exemplo de aplicação web VULNERÁVEL a SQL Injection.

Este arquivo é material didático: demonstra o que NÃO fazer.
Execute em ambiente isolado (VM local, laboratório). Nunca em produção.

Para ver a versão segura, consulte app_secure.py.
"""

import sqlite3
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse

DB_PATH = ":memory:"


def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user'
        )
    """)
    conn.execute("INSERT INTO users VALUES (1, 'admin', 'senha_secreta', 'admin')")
    conn.execute("INSERT INTO users VALUES (2, 'joao', 'minha_senha', 'user')")
    conn.execute("INSERT INTO users VALUES (3, 'maria', 'senha123', 'user')")
    conn.commit()
    return conn


# Banco compartilhado (em memória, apenas para demo)
db = init_db()


def login_vulneravel(username: str, password: str) -> dict | None:
    """
    VULNERÁVEL: concatena input do usuário diretamente na query.

    Payload para bypass completo:
        username: admin' --
        password: (qualquer coisa)

    A query resultante fica:
        SELECT * FROM users WHERE username='admin' --' AND password='...'
    O '--' comenta o resto: a verificação de senha é ignorada.

    Payload para dump de todos os usuários:
        username: ' OR '1'='1
        password: ' OR '1'='1
    """
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"

    # Exibe a query para fins didáticos
    print(f"[VULNERÁVEL] Query executada: {query}")

    cursor = db.execute(query)
    row = cursor.fetchone()

    if row:
        return {"id": row[0], "username": row[1], "role": row[3]}
    return None


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        params = parse_qs(parsed.query)

        username = params.get("username", [""])[0]
        password = params.get("password", [""])[0]

        if not username or not password:
            body = (
                b"<h2>Login Vulneravel (didatico)</h2>"
                b"<p>Parametros: <code>?username=X&password=Y</code></p>"
                b"<p>Tente: <code>?username=admin'%20--&password=qualquer</code></p>"
            )
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            self.wfile.write(body)
            return

        user = login_vulneravel(username, password)

        if user:
            msg = f"Login OK — usuario: {user['username']}, role: {user['role']}"
            self.send_response(200)
        else:
            msg = "Login falhou."
            self.send_response(401)

        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(msg.encode())

    def log_message(self, format, *args):
        pass  # silencia log padrão do HTTPServer


if __name__ == "__main__":
    PORT = 8080
    print(f"Servidor VULNERAVEL rodando em http://localhost:{PORT}")
    print("Pressione Ctrl+C para parar.\n")
    print("Exemplos de ataque:")
    print(f"  Bypass:  http://localhost:{PORT}?username=admin'%20--&password=x")
    print(f"  Dump:    http://localhost:{PORT}?username='%20OR%20'1'%3D'1&password='%20OR%20'1'%3D'1\n")
    HTTPServer(("", PORT), Handler).serve_forever()
