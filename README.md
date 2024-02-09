<h4 align="center"> 
	🚧 CRUD Cadastro de Contatos 🚀 🚧
</h4>

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/gabrielszg/dotnet-contact-list/blob/master/LICENSE) 

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autor">Autor</a> • 
</p>

## 💻 Sobre o projeto

🧺 Aplicação Web desenvolvida para cadastrar contatos, fornecendo nome, e-mail e data de cadastro.   

---

## ⚙️ Funcionalidades

- [x] Formulário para inserir as informações
- [x] Salvar no Banco de Dados
- [x] Lista com todos os contatos cadastrados
- [x] Editar ou Excluir contato da lista
- [x] Filtar por nome, e-mail e data de cadastro

---

## 🎨 Layout
  
  ### Web

  <p align="center">
    <img alt="Contacts" src="/print_screen.png" width="1000px">	
  </p>

---

## 🚀 Como executar o projeto

O projeto é dividido em duas partes:
1. Back End (pasta backend) 
2. Front End (pasta frontend)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Docker][docker], [.NET 8+][dotnet], [Node.js 20+][nodejs]. 
Além disto é bom ter um editor para trabalhar com o código como [VSCode][vscode]

### Criar Banco de Dados (MongoDB)

```bash

# Abra o Terminal na raiz do projeto e digite o comando 
$ docker-compose up

# O container será criado e iniciado

# O Mongo Express estará disponível no endereço (usuário e senha estão no arquivo docker-compose)
http://localhost:8081

```

### Rodando o Back End (.NET 8+)

```bash

# Abra o Terminal na pasta backend e rode o comando 
$ dotnet run

# A API estará disponível no endereço
http://localhost:5143/swagger/index.html

```

### Rodando a Aplicação Web (Next.js)

```bash

# Abra o Terminal na pasta frontend e rode os comandos 
$ npm install
$ npm run dev

# A API estará disponível no endereço
http://localhost:3000/

```

## 🛠 Tecnologias

### Back End

[.NET 8](https://dotnet.microsoft.com/pt-br/download/dotnet/8.0)

-   **[MongoDB](https://www.mongodb.com/pt-br)**
-   **[Docker](https://www.docker.com/)**

### Front End

[Next.js](https://nextjs.org/)

-   **[React-icons](https://react-icons.github.io/react-icons/)**
-   **[React Hook Form](https://react-hook-form.com/)**
-   **[Tailwind CSS](https://tailwindcss.com/)**

## 🦸🏻‍♂️ Autor

<a href="https://github.com/gabrielszg">
  <p>@gabrielszg</p>
</a>
