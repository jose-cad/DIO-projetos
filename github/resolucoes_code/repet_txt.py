"""Módulo para repetição de textos com base em número inteiro."""


def executar():
    print("--- 2. Repetindo Textos ---")
    texto = input("Digite um texto: ")
    numero = int(input("Digite o número de repetições: "))
    print(f"Resultado: {(texto + ' ') * numero}\n")
