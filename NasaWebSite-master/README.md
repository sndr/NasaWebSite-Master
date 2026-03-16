# NasaWebSite

Aplicação em Angular que permite pesquisar imagens na API pública da NASA e visualizar as fotos em um modal (expandido) com botão de fechar.

## Requisitos

- Node.js (recomendado: LTS)
- npm (ou outro gerenciador compatível)

## Rodando o projeto (dev)

Na pasta `NasaWebSite-master`:

```bash
npm install
npm start
```

Abra `http://localhost:4200/`.

## Como usar

- **Pesquisar**: digite um termo no header e clique em **Search**
- **Ver imagem em tela cheia**: clique em qualquer miniatura para abrir o modal centralizado
- **Fechar modal**: clique fora da imagem, clique em **Fechar**, ou pressione `Esc`
- **Voltar para o início**: clique no ícone de **casinha** no canto esquerdo do header (também limpa a busca)

## Scripts úteis

```bash
# dev server
npm start

# build
npm run build

# tests
npm test
```

## Stack

- Angular (standalone components + Router)
- Tailwind CSS (usado via `@apply` em SCSS)
- NASA Images API: `https://images-api.nasa.gov/search`

## Estrutura (principais arquivos)

- `src/app/header/` header com busca + botão home
- `src/app/search/` tela de resultados + modal de imagem

## Notas

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli).
