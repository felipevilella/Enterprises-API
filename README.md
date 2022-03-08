<h1 align="center"> Enterprises-API </h1>


## Descrição do Projeto
<p align="justify"> uma aplicação de gestão de empresas e usuários que são colaboradores dessas empresas, como uma espécie de parte de um ERP - Enterprise Resource Planning. </p>


### Topico Completados

- [V] Cadastro de Usuario
- [V] Editar de Usuario
- [V] Detalhar de Usuario
- [V] Listar de Usuario
- [V] Cadastrar empresa
- [V] Editar empresa
- [X] Listar empresa
- [X] Detalhar empresa
- [X] Excluir empresa
- [X] Vincular Colaborador
- [X] Desvincular colaborador
- [X] Listar Colaboradores
- [X] Anaiador sintático(inter)
- [X] Formatador de codigo
- [X] Teste Unitarios 
- [X] PostegreSQL
- [ ] MongoDB 
- [X] Swagger
- [X] Bearer <Token> 


### Executando o projeto

  1. Execute ```yarn dev``` raiz da aplicação.
  2. Caso não possua o docker instaldo na sua maquina siga essas instruções [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart) 
  1. Execute ```docker-compose up -d``` para iniciar o container do redis. 
  3. A aplicação estará disponível no endereço [http://localhost:3333](http://localhost:3333)
  4. Execute ``yarn test`` para rodar os testes unitarios da aplicação
  4. Execute ``yarn Migration`` para rodar as migrations
  6. Documentação em swagger para ter acesso a rota e testar os endpoints com as funções [https://localhost:3333/api-docs/](https://localhost:3333/api-docs/))
  7. Rodar em segundo plano em servidor no modo de produção ```node dist/shared/infra/http/server.js &```


### Comandos úteis
  - `yarn build` Gera um build para a produção
  - `yarn` instalar bibliotecas
  
