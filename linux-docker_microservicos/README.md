# Projeto: Implementação de Microsserviços com Docker e Nginx

Este projeto faz parte do módulo de **Docker e Microsserviços** do curso **Linux do Zero** da **DIO (Digital Innovation One)**. O objetivo foi criar uma infraestrutura escalável com balanceamento de carga, garantindo a comunicação entre múltiplos containers.

## 🚀 Melhorias Implementadas

Diferente da estrutura básica proposta inicialmente, este repositório traz evoluções seguindo boas práticas de infraestrutura:

1.  **Orquestração com Docker Compose:** Automação completa do ambiente em vez de subida manual de containers.
2.  **Load Balancer (Nginx):** Configuração de um proxy reverso para distribuir requisições entre três instâncias da aplicação.
3.  **Dockerfile Multi-Contexto:** Criação de imagens personalizadas para o PHP com as extensões necessárias (`mysqli`) e para o Nginx com configurações otimizadas.
4.  **Resolução de Nomes (DNS Interno):** Remoção de IPs fixos, utilizando o DNS interno do Docker para comunicação entre os serviços.
5.  **Persistência e Auto-Init:** Inicialização automática do banco de dados através de volumes mapeados.

## 🏗️ Arquitetura do Projeto

* **Load Balancer (Nginx):** Escuta na porta `4500` e distribui a carga via Round Robin.
* **App (PHP 8.0 Apache):** 3 instâncias replicadas processando o código e inserindo dados.
* **Database (MySQL 5.7):** Serviço de persistência isolado na rede interna.

## 🛠️ Como Executar

### Pré-requisitos
* Docker e Docker Compose instalados.

### Passo a passo
1.  **Clone apenas esta pasta do repositório:**

    Este projeto faz parte do repositório central [DIO-projetos](https://github.com/Jota4wd/DIO-projetos), que reúne vários projetos independentes. Para clonar **somente esta pasta**, siga as instruções de sparse-checkout descritas no [README principal do repositório](https://github.com/Jota4wd/DIO-projetos#-como-clonar-apenas-uma-pasta-sparse-checkout).

    Resumo rápido:
    ```bash
    git clone --no-checkout --filter=blob:none https://github.com/Jota4wd/DIO-projetos.git
    cd DIO-projetos
    git sparse-checkout init --cone
    git sparse-checkout set linux-linux_docker_microservicos
    git checkout main
    ```

2. Suba o ambiente:
   ```bash
   docker compose up -d --build
   ```

3. Acesse no navegador: http://localhost:4500

### 📊 Validação de Resultados
A eficiência do balanceamento pode ser comprovada verificando a tabela de logs no banco de dados, onde a coluna Host registra o ID único de cada container que processou a requisição:

   ```bash
   docker exec -it linux_docker_microservicos-db-1 mysql -u root -pSenha123 meubanco -e "SELECT * FROM dados;"
   ```

4. 🧹 Limpeza do Ambiente
Para remover todos os recursos criados e liberar espaço em disco:
   ```bash
   docker compose down
   docker system prune -a
   ```

### Desenvolvido como parte do desafio prático da DIO.
