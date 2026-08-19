# DIO Projetos

Repositório central com todos os projetos desenvolvidos na plataforma [DIO (Digital Innovation One)](https://www.dio.me/).

Cada pasta na raiz deste repositório representa **um projeto isolado e independente**, com seu próprio código e seu próprio `README.md` explicando os detalhes, tecnologias usadas e instruções específicas daquele projeto.

## 📂 Estrutura

```
DIO-projetos/
├── nome-do-projeto-1/
│   ├── README.md
│   └── ...
├── nome-do-projeto-2/
│   ├── README.md
│   └── ...
└── README.md   (este arquivo)
```

## 📥 Como clonar apenas uma pasta (sparse-checkout)

Como cada pasta é um projeto separado, você não precisa baixar o repositório inteiro para acessar só um deles. O Git tem um recurso chamado **sparse-checkout** que permite clonar somente a(s) pasta(s) que te interessam.

### Passo a passo

**1. Clone o repositório sem baixar os arquivos (`--no-checkout`) e de forma rasa (`--filter=blob:none`)**

```bash
git clone --no-checkout --filter=blob:none https://github.com/Jota4wd/DIO-projetos.git
cd DIO-projetos
```

**2. Ative o sparse-checkout**

```bash
git sparse-checkout init --cone
```

**3. Defina qual(is) pasta(s) você quer baixar**

```bash
git sparse-checkout set nome-do-projeto
```

> Troque `nome-do-projeto` pelo nome exato da pasta que você quer. Você pode listar mais de uma pasta separada por espaço, se quiser baixar vários projetos ao mesmo tempo:
> ```bash
> git sparse-checkout set projeto-1 projeto-2
> ```

**4. Faça o checkout dos arquivos**

```bash
git checkout main
```

Pronto! Agora, dentro da sua pasta local `DIO-projetos`, só existirá a(s) pasta(s) que você selecionou, em vez do repositório inteiro.

### Adicionando outra pasta depois

Se mais tarde você quiser incluir outro projeto no seu clone já existente, basta rodar novamente:

```bash
git sparse-checkout add outro-projeto
```

### Voltando a ver o repositório inteiro

```bash
git sparse-checkout disable
```

## ℹ️ Observações

- Cada projeto tem seu próprio `README.md` com instruções específicas (como instalar, rodar, tecnologias utilizadas, etc.). Este README serve apenas para explicar a organização geral do repositório.
- Os projetos aqui reunidos foram desenvolvidos como parte de bootcamps e trilhas de estudo da [DIO](https://www.dio.me/).
