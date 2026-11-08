"""
Exemplo de aplicação web SEGURA contra SQL Injection.

Versão corrigida de app.py: mesma funcionalidade, sem a vulnerabilidade.
O que mudou: consulta parametrizada substitui a concatenação de strings.

Execute em ambiente isolado (VM local, laboratório).
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


db = init_db()


def login_seguro(username: str, password: str) -> dict | None:
    """
    SEGURO: usa consulta parametrizada (prepared statement).

    O driver SQLite trata username e password como dados, nunca como SQL.
    Qualquer payload de injeção (admin' --, ' OR '1'='1, etc.) é comparado
    literalmente com o valor armazenado — e falha a autenticação como esperado.

    Diferença única em relação à versão vulnerável: os ? substituem as
    interpolações de f-string. O banco monta a query internamente, sem
    concatenar o input do usuário.
    """
    query = "SELECT * FROM users WHERE username=? AND password=?"

    print(f"[SEGURO] Query executada: {query}")
    print(f"[SEGURO] Parametros: ({username!r}, {password!r})")

    cursor = db.execute(query, (username, password))
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
                b"<h2>Login Seguro (didatico)</h2>"
                b"<p>Parametros: <code>?username=X&password=Y</code></p>"
                b"<p>Tente o payload de injecao: <code>?username=admin'%20--&password=qualquer</code></p>"
                b"<p>Desta vez o ataque falha.</p>"
            )
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            self.wfile.write(body)
            return

        user = login_seguro(username, password)

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
        pass


if __name__ == "__main__":
    PORT = 8081
    print(f"Servidor SEGURO rodando em http://localhost:{PORT}")
    print("Pressione Ctrl+C para parar.\n")
    print("Teste com credenciais corretas:")
    print(f"  http://localhost:{PORT}?username=admin&password=senha_secreta")
    print("\nTeste com payload de injecao (deve falhar):")
    print(f"  http://localhost:{PORT}?username=admin'%20--&password=x\n")
    HTTPServer(("", PORT), Handler).serve_forever()
