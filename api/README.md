# Abstrakt API

[![Node Version](https://badgen.net/npm/node/next)](https://nodejs.org/en/)

## Instalação

Abstrakt API precisa de [Node.js](https://nodejs.org/) v12+ para rodar.

Instale todas as dependências do projeto.

```sh
cd abstrakt/api
npm install ou yarn install
```

Para usar em ambiente de produção

```sh
npm install --production
NODE_ENV=production
npm run build
npm start
```

## Variáveis de Ambiente
Esta API depende de variáveis de ambiente. Para desenvolvimento pode-se coloca-las dentro de uma .env na pasta raiz da api.
```text
PORT=<Porta para o servidor HTTP>
TOKEN_SECRET=<Segredo para assinar os token JWT>
GOOGLE_SECRET=<Segredo das credenciais do Google OAuth>
GOOGLE_ID=<Id da aplicação gerado pelo Google>
MONGO_URI=<Endereço do banco de dados MongoDB>
NODE_ENV=<Define o modo de execução, desenvolvimento ou produção>
```