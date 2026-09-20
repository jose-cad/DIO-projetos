"""Módulo para verificação de palíndromos."""


def executar():
    print("--- 6. Verificando Palíndromos ---")
    palavra = input("Digite uma palavra ou frase: ")
    limpo = "".join(caractere.lower() for caractere in palavra if caractere.isalnum())

    if limpo == limpo[::-1]:
        print(f"A entrada '{palavra}' É um palíndromo!\n")
    else:
        print(f"A entrada '{palavra}' NÃO é um palíndromo.\n")
