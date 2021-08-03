<h1 align="center">
    Boilerplate Next.js
</h1>

<p align="center">
  <a href="#rocket-sobre">Sobre</a> | <a href="#computer-tecnologias">Tecnologias</a> | <a href="#books-guia-de-instalação-e-execução">Guia de instalação e execução</a> | <a href="#page_with_curl-licença">Licença</a>
</p>

## :rocket: Sobre

<p>Este boilerplate foi desenvolvido com o objetivo de automatizar a criação de novos projetos. O <b>Next.js</b> foi escolhido como principal tecnologia por ser um framework React.js opinativo, com estruturas e ferramentas definidas além de ter suporte para criação de páginas SSG, SSR e SPA e facilidade na transformação das aplicações em <b>PWA</b>.</p> 

O <b>Typescript</b> foi adicionado para dar poder tanto ao Next.js como para o <b>Storybook</b> que é a biblioteca escolhida para a documentação de componentes deste template.

O ambiente de testes foi configurado com <b>JEST</b>, e algumas automações foram incluídas:

  - lint com **ESlint** e **Prettier** em tempo real
  - execução automática do lint e testes unitários a cada commit com **Husky** para evitar commits quebrados
  - criação de componentes com **plop** (incluindo o arquivo de styles, teste e história do storybook)

## :computer: Tecnologias

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/)
- [Plop](https://plopjs.com/)
- [Husky](https://github.com/typicode/husky)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## :books: Guia de instalação e execução

### Pré-requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

### Como executar

- Execute ```yarn create next-app -e https://github.com/nathaliacristina20/boilerplate-nextjs``` em seu terminal
- Vá até o diretório da pasta criada ```cd nome_do_seu_projeto```
- Execute ```yarn``` para instalar as dependências
- Execute ```yarn dev``` para rodar a aplicação em desenvolvimento e abra [http://localhost:3000](http://localhost:3000) em seu navegador
- Execute ```yarn storybook``` e abra [http://localhost:6006](http://localhost:6006) em seu navegador
- Execute ```yarn test``` em seu terminal para rodar os testes. Caso deseje que os testes fiquem executando e assistindo modificações em paralelo ao desenvolvimento, execute ```yarn test:watch```

Caso deseje ver um relatório da cobertura abra o arquivo index.html gerado em ```coverage/lcov-report```. Este relatório fica disponível somente após a primeira execução dos testes.

Caso deseje ver um relatório do PWA com o Google Lighthouse execute ```yarn build``` antes de utilizar esta ferramenta. 

**Para criar um componente novo**

- Execute ```yarn generate``` e siga o que for pedido
    
## :page_with_curl: Licença

Esse projeto está sob a licença MIT. Veja o arquivo <a href="https://github.com/nathaliacristina20/boilerplate-nextjs/blob/master/LICENSE">LICENSE</a> para mais detalhes.

<hr />
<p>by Nathalia Cristina :wave: <a href="https://linktr.ee/nathaliacristina20">Get in touch!</a></p>
