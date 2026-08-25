# Parking

Desafio de projeto da trilha **.NET Fundamentals**, da [DIO](https://www.dio.me/).

O desafio original propõe um sistema de estacionamento em C#, com uma estrutura de código pronta para ser completada (`TODOs`), representando os veículos como uma lista de strings (`List<string>`).

Optei por resolver de uma forma mais idiomática, com algumas diferenças em relação à proposta original:

- Criação de uma classe `Vehicle` para representar o veículo como um objeto, em vez de apenas uma string solta
- Nomenclatura em inglês, seguindo convenção comum em projetos C#/.NET
- Uso de `StringComparison.OrdinalIgnoreCase` nas comparações de string, em vez de `.ToUpper()`
- Formatação de valores monetários com casas decimais fixas (`:F2`)

## 🚀 Tecnologias

- .NET / C#

## ▶️ Como rodar

```bash
dotnet run
```

## 📋 Funcionalidades

- Cadastrar veículo
- Remover veículo (com cálculo do valor a pagar)
- Listar veículos estacionados

## 📚 Sobre

Desafio de projeto realizado através da [DIO](https://www.dio.me/), como parte do aprendizado de C#/.NET.
