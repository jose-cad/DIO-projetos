# ⚡ Calculadora de Crédito de Carbono

## 🌟 Projeto Final do Bootcamp GitHub Copilot (DIO)

Este projeto é o resultado prático e a conclusão da trilha de aprendizado do **Bootcamp GitHub Copilot: Seu Programador Parceiro**, oferecido pela **Digital Innovation One (DIO)** em parceria com o GitHub.

A Calculadora de Crédito de Carbono foi desenvolvida do zero, utilizando o GitHub Copilot como ferramenta principal para a geração de código (HTML, CSS e JavaScript), otimização de layout (Bootstrap) e refatoração de código, demonstrando o potencial da Inteligência Artificial no fluxo de trabalho de desenvolvimento.

---

## ✨ Funcionalidades

A aplicação é um *Single Page Application* (SPA) simples, projetada para calcular a emissão estimada de dióxido de carbono ($\text{CO}_2$) e o custo de compensação para viagens entre as principais capitais brasileiras.

* **Cálculo de Distância:** Baseado em uma base de dados interna de distâncias aéreas e rodoviárias.
* **Seleção de Transporte:** Permite ao usuário escolher entre diferentes meios (bicicleta, moto, carro, ônibus, caminhão, avião) com diferentes taxas de emissão.
* **Estimativa de Emissão:** Calcula a emissão total em $\text{kg CO}_2$.
* **Custo de Compensação:** Estima o valor financeiro necessário para a compensação da emissão, utilizando um valor de mercado de referência.
* **Design Responsivo:** Layout Dark Mode otimizado usando Bootstrap 5, garantindo usabilidade em diferentes dispositivos.

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **HTML5** | Estrutura da aplicação. |
| **CSS3** | Estilização personalizada em Dark Mode. |
| **Bootstrap 5** | Framework para layout e componentes responsivos. |
| **JavaScript (ES6+)** | Lógica de cálculo, manipulação do DOM e leitura dos dados embutidos. |
| **GitHub Copilot** | Assistência por I.A. na codificação, refatoração, documentação e otimização. |

---

## 🚀 Como Usar (Setup Local)

O projeto é 100% *client-side* e não requer servidor web.

1.  **Clone apenas esta pasta do repositório:**

    Este projeto faz parte do repositório central [DIO-projetos](https://github.com/Jota4wd/DIO-projetos), que reúne vários projetos independentes. Para clonar **somente esta pasta**, siga as instruções de sparse-checkout descritas no [README principal do repositório](https://github.com/Jota4wd/DIO-projetos#-como-clonar-apenas-uma-pasta-sparse-checkout).

    Resumo rápido:
    ```bash
    git clone --no-checkout --filter=blob:none https://github.com/Jota4wd/DIO-projetos.git
    cd DIO-projetos
    git sparse-checkout init --cone
    git sparse-checkout set calculadora_ecoTrip
    git checkout main
    ```

2.  **Abra os Arquivos:**
    Navegue até o diretório clonado e abra o arquivo `index.html` diretamente no seu navegador preferido (Chrome, Firefox, etc.).

3.  **Calcule:**
    * Insira as capitais de **Origem** e **Destino** (utilize a lista de autocompletar para garantir o nome correto).
    * Selecione o **Meio de Transporte**.
    * Clique em **"Calcular Emissão de Carbono"**.

O resultado da emissão e o custo de compensação serão exibidos imediatamente na tela.

---

## 🤖 A Experiência Copilot

O uso do GitHub Copilot foi fundamental para:

* **Estrutura Inicial:** Geração rápida da estrutura de *Dark Mode* com Bootstrap.
* **Manipulação de Dados:** Assistência na criação das funções de normalização de texto e de parsing dos dados de distância embutidos no JavaScript.
* **Refatoração:** Otimização contínua do código JS e dos estilos CSS para melhor legibilidade e desempenho.
* **Documentação:** Auxílio na geração do conteúdo deste `README.md`.

O projeto é um testemunho da eficiência e agilidade que o Copilot adiciona ao processo de desenvolvimento, permitindo focar mais na lógica do negócio e menos na sintaxe repetitiva.

---
