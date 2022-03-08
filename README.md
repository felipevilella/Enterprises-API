<h1 align="center"> Enterprises-API </h1>


## Descrição do Projeto
<p align="justify"> uma aplicação de gestão de empresas e usuários que são colaboradores dessas empresas, como uma espécie de parte de um ERP - Enterprise Resource Planning. </p>


### Topico Completados

- [x] Cadastro de Usuario
- [x] Editar de Usuario
- [x] Detalhar de Usuario
- [x] Listar de Usuario
- [x] Cadastrar empresa
- [x] Editar empresa
- [x] Listar empresa
- [x] Detalhar empresa
- [x] Excluir empresa
- [x] Vincular Colaborador
- [x] Desvincular colaborador
- [x] Listar Colaboradores
- [x] Anaiador sintático(inter)
- [x] Formatador de codigo
- [x] Teste Unitarios 
- [x] PostegreSQL
- [x] Swagger
- [x] Bearer <Token> 


### Executando o projeto

  1. Execute ```yarn dev``` raiz da aplicação.
  2. Caso não possua o docker instaldo na sua maquina siga essas instruções [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart) 
  1. Execute ```docker-compose up -d``` para iniciar o container do redis. 
  3. A aplicação estará disponível no endereço [http://localhost:3333](http://localhost:3333)
  4. Execute ``yarn test`` para rodar os testes unitarios da aplicação
  4. Execute ``yarn migration`` para rodar as migrations
  6. Documentação em swagger para ter acesso a rota e testar os endpoints com as funções [https://localhost:3333/api-docs/](https://localhost:3333/api-docs/))
  7. Rodar em segundo plano em servidor no modo de produção ```node dist/shared/infra/http/server.js &```


### Comandos úteis
  - `yarn build` Gera um build para a produção
  - `yarn` instalar bibliotecas
  
### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Express](https://expressjs.com)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://www.npmjs.com/package/typeorm)
- [Celebrate](https://www.npmjs.com/package/celebrate)
- [Swagger](https://blog.logrocket.com/documenting-your-express-api-with-swagger/)
- [Jest](https://jestjs.io)
  
  
  
  
