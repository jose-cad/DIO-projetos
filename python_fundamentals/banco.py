from abc import ABC, abstractmethod
from utils import log_transacao, Historico, GeradorRelatorio, ContaIterador
from cliente import PessoaFisica

class Conta:
    def __init__(self, numeroConta, cliente):
        self._saldo = 0
        self._Conta = numeroConta
        self._agencia = '0001'
        self._cliente = cliente
        self._historico = Historico()

    def __str__(self):
        return f"Agência: {self.agencia}, Conta: {self.numeroConta}, Titular: {self.cliente.nome}, Saldo: R${self.saldo:.2f}"

    @classmethod
    def novaConta(cls, cliente, numeroConta):
        return cls(numeroConta, cliente)

    @property
    def saldo(self):
        return self._saldo

    @property
    def numeroConta(self):
        return self._Conta

    @property
    def agencia(self):
        return self._agencia

    @property
    def cliente(self):
        return self._cliente

    @property
    def historico(self):
        return self._historico

    @log_transacao
    def sacar(self, valor):
        saldo = self.saldo
        excedeuSaldo = valor > saldo
        if excedeuSaldo:
            print('Operacao falhou, saldo insuficiente.')
        elif valor > 0:
            self._saldo -= valor
            print('Saque realizado com sucesso.')
            return True
        else:
            print('Operacao falhou, valor informado eh invalido')
        return False

    @log_transacao
    def depositar(self, valor):
        if valor > 0:
            self._saldo += valor
            print('Deposito realizado com sucesso.')
            return True
        else:
            print('Operacao falhou, valor informado eh invalido.')
            return False
    
    def to_dict(self):
        return {
            'numeroConta': self._Conta,
            'saldo': self._saldo,
            'agencia': self._agencia,
            'cliente': self._cliente.cpf,
            'historico': self._historico.to_dict(),
            'tipo': self.__class__.__name__
        }

    @classmethod
    def from_dict(cls, dados, clientes):
        cliente_vinculado = next((c for c in clientes if c.cpf == dados['cliente']), None)
        if not cliente_vinculado:
            raise ValueError(f"Cliente com CPF {dados['cliente']} não encontrado.")
        conta = cls(dados['numeroConta'], cliente_vinculado)
        conta._saldo = dados['saldo']
        conta._agencia = dados['agencia']
        conta._historico = Historico.from_dict(dados['historico'])
        return conta


class ContaCorrente(Conta):
    def __init__(self, numeroConta, cliente, limite=500, limiteSaque=3):
        super().__init__(numeroConta, cliente)
        self.limite = limite
        self.limiteSaque = limiteSaque

    def __str__(self):
        return f"""\
agencia:\t{self.agencia}
c/c:\t\t{self.numeroConta}
titular:\t{self.cliente.nome}
"""

    def __repr__(self):
        return f'<{self.__class__.__name__}: ("{self.agencia}", "{self.numeroConta}", "{self.cliente.nome}")>'

    def sacar(self, valor):
        numeroSaques = len(
            [transacao for transacao in self.historico.transacoes if transacao['tipo'] == Saque.__name__]
        )
        excedeuLimite = valor > self.limite
        excedeuSaque = numeroSaques >= self.limiteSaque
        
        if excedeuLimite:
            print('Operacao falhou, saque acima do limite.')
            return False
        elif excedeuSaque:
            print('Operacao falhou, excedeu limite de saques')
            return False
        else:
            return super().sacar(valor)

    def gerar_relatorio(self, tipo_transacao=None):
        return GeradorRelatorio.gerar_relatorio_transacoes(self, tipo_transacao)

    def to_dict(self):
        dados = super().to_dict()
        dados.update({
            'limite': self.limite,
            'limiteSaque': self.limiteSaque
        })
        return dados

    @classmethod
    def from_dict(cls, dados, clientes):
        cliente_vinculado = next((c for c in clientes if c.cpf == dados['cliente']), None)
        if not cliente_vinculado:
            raise ValueError(f"Cliente com CPF {dados['cliente']} não encontrado.")
        conta = cls(dados['numeroConta'], cliente_vinculado, 
                   limite=dados.get('limite', 500),
                   limiteSaque=dados.get('limiteSaque', 3))
        conta._saldo = dados['saldo']
        conta._agencia = dados['agencia']
        conta._historico = Historico.from_dict(dados['historico'])
        return conta


class Transacao(ABC):
    @property
    @abstractmethod
    def valor(self):
        pass

    @abstractmethod
    def registrar(self, conta):
        pass


class Saque(Transacao):
    def __init__(self, valor):
        self._valor = valor

    @property
    def valor(self):
        return self._valor

    def registrar(self, conta):
        sucessoTransacao = conta.sacar(self.valor)
        if sucessoTransacao:
            conta.historico.adicionar_transacao(self)


class Deposito(Transacao):
    def __init__(self, valor):
        self._valor = valor

    @property
    def valor(self):
        return self._valor

    def registrar(self, conta):
        sucessoTransacao = conta.depositar(self.valor)
        if sucessoTransacao:
            conta.historico.adicionar_transacao(self)


@log_transacao
def depositar(clientes):
    cpf = input('informe o cpf do cliente: ')
    cliente = filtrarCliente(cpf, clientes)
    if not cliente:
        print('cliente nao cadastrado')
        return
    valor = float(input('valor do deposito: '))
    transacao = Deposito(valor)
    conta = recuperarContaCliente(cliente)
    if not conta:
        return
    cliente.realizarTransacao(conta, transacao)


@log_transacao
def sacar(clientes):
    cpf = input('cpf do cliente: ')
    cliente = filtrarCliente(cpf, clientes)
    if not cliente:
        print('cliente nao cadastrado')
        return
    valor = float(input('valor do saque: '))
    transacao = Saque(valor)
    conta = recuperarContaCliente(cliente)
    if not conta:
        return
    cliente.realizarTransacao(conta, transacao)


@log_transacao
def exibirExtrato(clientes):
    cpf = input('cpf do cliente: ')
    cliente = filtrarCliente(cpf, clientes)
    if not cliente:
        print('cliente nao cadastrado')
        return
    conta = recuperarContaCliente(cliente)
    if not conta:
        return
    titulo = '  EXTRATO  '
    decorador = '#'
    print(titulo.center(40,'#'))
    transacoes = conta.historico.transacoes
    extrato = ''
    if not transacoes:
        extrato = 'sem movimentacao'
    else:
        for transacao in transacoes:
            extrato += f"\n{transacao['tipo']}:\n\tR${transacao['valor']:.2f}"
    print(extrato)
    print(f"\nSaldo:\n\tR$ {conta.saldo:.2f}")
    print(decorador.center(40,'#'))


def cadastrarCliente(clientes):
    cpf = input('Informe o CPF: ')
    cliente = filtrarCliente(cpf, clientes)
    if cliente:
        print('usuario ja eh correntista')
        return
    nome = input('Nome completo: ')
    nascimento = input('Informe a data de nascimento (dd-mm-aaaa): ')
    endereco = input('Informe o endereço (logradouro, nro - bairro -  cidade/sigla estado): ')
    cliente = PessoaFisica(nome=nome, nascimento=nascimento, cpf=cpf, endereco=endereco)
    clientes.append(cliente)
    print('\n\nCliente cadastrado com sucesso')


def cadastrarConta(numeroConta, clientes, contas):
    cpf = input('Informe o cpf do correntista: ')
    cliente = filtrarCliente(cpf, clientes)
    if not cliente:
        print('Usuario ainda nao cadastrado')
        return
    conta = ContaCorrente.novaConta(cliente=cliente, numeroConta=numeroConta)
    contas.append(conta)
    cliente.contas.append(conta)
    print('conta aberta com sucesso')


def filtrarCliente(cpf, clientes):
    clientesFiltrados = [cliente for cliente in clientes if cliente.cpf == cpf]
    return clientesFiltrados[0] if clientesFiltrados else None


def recuperarContaCliente(cliente):
    if not cliente.contas:
        print('cliente nao possui conta')
        return
    return cliente.contas[0]


def exibir_relatorio_transacoes(clientes):
    cpf = input('CPF do cliente: ')
    cliente = filtrarCliente(cpf, clientes)
    if not cliente:
        print('Cliente não encontrado')
        return
    conta = recuperarContaCliente(cliente)
    if not conta:
        return
    tipo = input('Tipo de transação (Deixe vazio para todas, "Saque" ou "Deposito"): ').strip()
    tipo = tipo if tipo else None
    print("\n=== Relatório de Transações ===")
    for transacao in conta.gerar_relatorio(tipo):
        print(f"Tipo: {transacao['tipo']}")
        print(f"Valor: R$ {transacao['valor']:.2f}")
        print(f"Data: {transacao['data']}")
        print("-" * 30)


def listar_todas_contas(contas):
    print("\n=== Lista de Todas as Contas ===")
    iterador = ContaIterador(contas)
    for info_conta in iterador:
        print(f"Número: {info_conta['numero']}")
        print(f"Agência: {info_conta['agencia']}")
        print(f"Cliente: {info_conta['cliente']}")
        print(f"Saldo: R$ {info_conta['saldo']:.2f}")
        print("-" * 30)