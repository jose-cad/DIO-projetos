import json
from datetime import datetime
import logging
from functools import wraps

logging.basicConfig(
    filename='log.txt',
    level=logging.INFO,
    format='%(asctime)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S.%f'
)

def log_transacao(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        logging.info(func.__name__.upper())
        return func(*args, **kwargs)
    return wrapper

class CarregadorDados:
    def __init__(self, arquivo):
        self.arquivo = arquivo

    def carregar(self):
        try:
            with open(self.arquivo, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return {'clientes': [], 'contas': []}

    def salvar(self, dados):
        with open(self.arquivo, 'w') as f:
            json.dump(dados, f, indent=4)

class Historico:
    def __init__(self):
        self._transacoes = []

    @property
    def transacoes(self):
        return self._transacoes

    def adicionar_transacao(self, transacao):
        self._transacoes.append({
            "tipo": transacao.__class__.__name__,
            "valor": transacao.valor,
            "data": datetime.now().strftime("%d-%m-%Y %H:%M:%S")
        })

    def to_dict(self):
        return {'transacoes': self._transacoes}

    @classmethod
    def from_dict(cls, dados):
        historico = cls()
        historico._transacoes = dados.get('transacoes', [])
        return historico

class GeradorRelatorio:
    @staticmethod
    def gerar_relatorio_transacoes(conta, tipo_transacao=None):
        transacoes = conta.historico.transacoes
        if tipo_transacao:
            return [t for t in transacoes if t['tipo'] == tipo_transacao]
        return transacoes

class ContaIterador:
    def __init__(self, contas):
        self.contas = contas
        self.indice = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.indice >= len(self.contas):
            raise StopIteration
        
        conta = self.contas[self.indice]
        info_conta = {
            'numero': conta.numeroConta,
            'agencia': conta.agencia,
            'cliente': conta.cliente.nome,
            'saldo': conta.saldo
        }
        self.indice += 1
        return info_conta