# 🏥 Sistema de Agendamento - Clínica Médica

![Status](https://img.shields.io/badge/Status-Concluído-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

> 🔗 **Acesse o projeto online:** [https://clinica-medzo.vercel.app/](https://clinica-medzo.vercel.app/)

## 💻 Sobre o Projeto
Este é um sistema Web de gestão de agendamentos para clínicas médicas. Desenvolvido inicialmente como projeto acadêmico, foi aprimorado para o meu portfólio com lógicas avançadas de Front-End. O foco principal foi criar uma interface amigável (UI/UX) e implementar regras de negócio complexas no lado do cliente (Client-side).

## 🚀 Funcionalidades e Destaques Técnicos
Como o objetivo é focar no desenvolvimento Front-End, o sistema simula um banco de dados utilizando o `LocalStorage` do navegador, incluindo as seguintes features:

- **🔐 Autenticação e Autorização:** Sistema de Login inteligente que diferencia perfis ('Médico' e 'Paciente').
- **🛡️ Rotas Protegidas:** Controle de acesso nativo com JavaScript. Pacientes não conseguem acessar áreas exclusivas da configuração médica.
- **📅 Agenda Interativa (DOM Dinâmico):** Um calendário manipulável onde o médico visualiza seus pacientes do dia, navega pelas semanas e altera datas de forma dinâmica.
- **⚙️ CRUD Completo no LocalStorage:** 
  - **Pacientes:** Podem marcar consultas e visualizar o status.
  - **Médicos:** Podem interagir com a grade da agenda para adicionar notas, cancelar ou bloquear horários, com atualização visual em tempo real.

## 🛠️ Tecnologias Utilizadas
- **HTML5:** Semântica e estruturação do conteúdo.
- **CSS3:** Estilização, layout flexível (Flexbox/Grid) e interface responsiva.
- **JavaScript (ES6+):** Manipulação profunda do DOM, Event Listeners, lógicas de data/hora, redirecionamentos e gerenciamento de estado via LocalStorage.

## 💡 O que aprendi com este projeto
Durante o desenvolvimento, consegui aprofundar significativamente meus conhecimentos práticos em:
* Manipulação de objetos e arrays em JavaScript.
* Construção e atualização de componentes visuais complexos (como a renderização da grade de horários do médico).
* Criação de lógicas de segurança e proteção de rotas no Front-End.
* Persistência de dados locais utilizando a API do Web Storage.

## ⚙️ Como testar o projeto localmente

1. Abra a pasta do projeto.
2. Abra o arquivo `index.html` no seu navegador (ou utilize a extensão *Live Server* no VS Code).

🔑 **Credenciais pré-configuradas para teste:**
Para testar o controle de perfis e as rotas protegidas, utilize os dados abaixo:

* **Perfil Médico (Acesso Total):** `medzo@exemplo.com` | Senha: `senha123`
* **Perfil Paciente (Acesso Restrito):** `alice@email.com` | Senha: `123`

## 📞 Contato

Desenvolvido por **Andryws Pedro**.

* **LinkedIn:** https://www.linkedin.com/in/andryws-pedro-2b15b6275
* **Portfólio/GitHub:** https://github.com/Andryws121
* **WhatsApp/Telefone:** +55 (31) 98529-4671
