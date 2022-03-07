# Enterprises-API

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
  
