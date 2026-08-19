from datetime import datetime

class Cliente:
    def __init__(self, endereco):
        self.endereco = endereco
        self.contas = []

    def realizarTransacao(self, conta, transacao):
        transacao.registrar(conta)

    def adicionar_conta(self, conta):
        self.contas.append(conta)

class PessoaFisica(Cliente):
    def __init__(self, nome, nascimento, cpf, endereco):
        super().__init__(endereco)
        self.nome = nome
        self.nascimento = nascimento
        self.cpf = cpf

    def to_dict(self):
        return {
            'nome': self.nome,
            'nascimento': self.nascimento,
            'cpf': self.cpf,
            'endereco': self.endereco,
            'tipo': 'PessoaFisica'
        }

    @classmethod
    def from_dict(cls, dados):
        return cls(
            nome=dados['nome'],
            nascimento=dados['nascimento'],
            cpf=dados['cpf'],
            endereco=dados['endereco']
        )