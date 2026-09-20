"""Módulo para realização de operações matemáticas simples."""


def executar():
    print("--- 3. Operações Matemáticas Simples ---")
    num1 = float(input("Digite o primeiro número: "))
    num2 = float(input("Digite o segundo número: "))
    operacao = input("Digite a operação (+, -, *, /): ")

    if operacao == "+":
        res = num1 + num2
    elif operacao == "-":
        res = num1 - num2
    elif operacao == "*":
        res = num1 * num2
    elif operacao == "/":
        res = num1 / num2 if num2 != 0 else "Erro: Divisão por zero"
    else:
        res = "Operação inválida"

    print(f"Resultado: {res}\n")
