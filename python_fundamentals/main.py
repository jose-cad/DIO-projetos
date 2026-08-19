from banco import (
    cadastrarCliente, cadastrarConta, depositar, sacar, 
    exibirExtrato, exibir_relatorio_transacoes, listar_todas_contas,
    Conta, ContaCorrente
)
from cliente import PessoaFisica
from utils import CarregadorDados

tipos_de_conta = {
    "ContaCorrente": ContaCorrente,
    "Conta": Conta
}

def menu():
    return """\n
    [cu] Cadastrar usuario
    [cc] Cadastrar conta
    [d] Depositar
    [s] Sacar
    [e] Extrato
    [r] Relatório de Transações
    [q] Sair
    
    >>>: """

def main():
    carregador = CarregadorDados('banco.json')
    dados = carregador.carregar()
    
    clientes = [PessoaFisica.from_dict(cliente_dict) for cliente_dict in dados.get('clientes', [])]
    contas = []
    
    for conta_dict in dados.get('contas', []):
        cliente = next((c for c in clientes if c.cpf == conta_dict['cliente']), None)
        if cliente:
            tipo_classe = tipos_de_conta.get(conta_dict["tipo"])
        if not tipo_classe:
            raise ValueError(f"Tipo de conta desconhecido: {conta_dict['tipo']}")
        conta = tipo_classe.from_dict(conta_dict, clientes)
        contas.append(conta)
        cliente.contas.append(conta)
    
    LIMITE_SAQUES = 3
    numeroConta = len(contas) + 1

    while True:
        opcao = input(menu())

        if opcao == 'cu':
            cadastrarCliente(clientes)

        elif opcao == 'cc':
            cadastrarConta(numeroConta, clientes, contas)
            numeroConta += 1

        elif opcao == 'd':
            depositar(clientes)

        elif opcao == 's':
            sacar(clientes)

        elif opcao == 'e':
            exibirExtrato(clientes)

        elif opcao == 'r':
            exibir_relatorio_transacoes(clientes)

        elif opcao == 'q':
            dados_para_salvar = {
                'clientes': [cliente.to_dict() for cliente in clientes],
                'contas': [conta.to_dict() for conta in contas]
            }
            carregador.salvar(dados_para_salvar)
            break

        else:
            print('Operacao invalida, por favor selecione novamente a operacao desejada.')

main()