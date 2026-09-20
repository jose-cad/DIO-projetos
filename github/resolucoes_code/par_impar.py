"""Módulo para verificação de números pares e ímpares."""


def executar():
    print("--- 4. Verificando Números Pares e Ímpares ---")
    numero = int(input("Digite um número inteiro: "))

    if numero % 2 == 0:
        print(f"O número {numero} é PAR.\n")
    else:
        print(f"O número {numero} é ÍMPAR.\n")
