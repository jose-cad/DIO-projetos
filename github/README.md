# Resolvendo Códigos em Python com o GitHub Copilot

Repositório desenvolvido para a entrega do desafio prático do bootcamp na **DIO**. O objetivo é aplicar o **GitHub Copilot** como assistente de desenvolvimento na resolução de algoritmos básicos em Python, otimizando a estrutura do código e sua documentação.

---

## 📁 Estrutura do Projeto

```text
.
├── resolucoes_code/
│   ├── __init__.py
│   ├── concat_dados.py
│   ├── media_notas.py
│   ├── ope_mat.py
│   ├── par_impar.py
│   ├── repet_txt.py
│   └── verif_palindromo.py
├── main.py
└── README.md
```

---

## 📌 Algoritmos Desenvolvidos

1. **Concatenando Dados (`concat_dados.py`)**
   - Recebe duas entradas de texto do usuário e as combina em uma única string.
   - *Conceitos:* Manipulação de strings, entradas com `input()` e concatenação.

2. **Repetindo Textos (`repet_txt.py`)**
   - Solicita uma string e um número inteiro, retornando a palavra repetida a quantidade de vezes informada.
   - *Conceitos:* Conversão de tipos (`int`) e multiplicação de strings.

3. **Operações Matemáticas Simples (`ope_mat.py`)**
   - Solicita dois números e o operador matemático desejado (`+`, `-`, `*`, `/`) para calcular e exibir o resultado.
   - *Conceitos:* Operações aritméticas, estruturas condicionais (`if/elif/else`) e tratamento de divisão por zero.

4. **Verificando Números Pares e Ímpares (`par_impar.py`)**
   - Recebe um número inteiro e verifica se ele é par ou ímpar utilizando o operador de módulo (`%`).
   - *Conceitos:* Estruturas condicionais e operador resto da divisão.

5. **Calculando Média de Notas (`media_notas.py`)**
   - Calcula a média aritmética de três notas fornecidas pelo usuário.
   - *Conceitos:* Operadores aritméticos e formatação de saída numérica.

6. **Verificando Palíndromos (`verif_palindromo.py`)**
   - Valida se uma palavra ou frase é idêntica quando lida de trás para frente.
   - *Conceitos:* Slicing de strings (`[::-1]`), remoção de caracteres especiais e padronização para caixa baixa.

---

## 🚀 Como Executar

### Opção 1: Execução orquestrada (Recomendado)
Para rodar todos os algoritmos em sequência a partir do script principal:

```bash
python3 main.py
```

### Opção 2: Execução de um módulo específico
Você também pode executar qualquer um dos scripts isoladamente:

```bash
python3 resolucoes_code/concat_dados.py
```

---

## 🛠️ Tecnologias Utilizadas

- **Python 3**
- **Git & GitHub**
- **GitHub Copilot**