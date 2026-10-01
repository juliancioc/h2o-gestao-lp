# CLAUDE.md — h2o-gestao-lp

Landing page do H2O Gestão (h2ogestao.com.br): Vite + React + Tailwind/shadcn,
com prerender por rota no build (`scripts/prerender.mjs`). Como publicar uma
ferramenta nova está em `docs/aquisicao-por-conteudo.md`, seção 6.

## Fluxo de trabalho

- **Não commite e não dê push sem o dono pedir.** Termine o trabalho, deixe no
  working tree, avise que está pronto e espere.

### Teste só depois da validação

**Não escreva nem altere teste (de unidade, de tela ou qualquer outro) antes de
o dono validar a UI.** Implemente, avise que está pronto e espere o dono abrir a
tela. O teste entra depois, quando o dono disser que é isso mesmo, e aí cobre o
que ficou, não o que se imaginou que ficaria.

Vale mesmo quando a especificação da tarefa pede teste: a especificação diz o
que testar, não quando. Teste escrito antes da validação congela um
comportamento que ainda vai mudar, e cada ajuste passa a custar duas vezes.
Rodar lint, typecheck e build para não quebrar nada continua certo a qualquer
momento; o que espera é teste **novo**.

Mesma regra do `CLAUDE.md` do jarvis-finance-front e do jarvis-finance-api.
Definido em 25/09/2026 e reforçado para a LP em 30/09/2026.

## Conferir localmente

- `npm run dev` (porta 8080) serve o código direto. Ferramentas que salvam no
  `localStorage` restauram o que o navegador guardou: ao mudar um valor padrão,
  suba a versão da chave de armazenamento, senão a tela continua mostrando o
  valor antigo. Com a aba aberta durante a edição, o Fast Refresh mantém o
  estado antigo e o grava na chave nova; para ver o padrão, use o botão de
  restaurar da ferramenta ou limpe o `localStorage` e recarregue.
- Não confie no `vite preview` para erro de hidratação: ele devolve o
  `index.html` da home em qualquer rota e fabrica um erro que não existe em
  produção. Sirva o `dist` resolvendo `pasta/index.html`, como a Vercel faz.
