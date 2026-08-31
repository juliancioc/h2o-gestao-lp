# Aquisição por conteúdo na landing page

Análise feita em 28/08/2026 e plano de ataque para o problema "a LP tem uma
calculadora só e nenhum conteúdo".

Por que essa frente existe: conteúdo é o único canal que continua rendendo
depois que se para de pagar anúncio, e é o que faz o CAC (medido pela conta da
plataforma no painel admin) cair em vez de subir. O público busca por dor
específica ("quanto cobrar pelo galão", "como controlar vasilhame", "planilha
para distribuidora de água"), e cada uma dessas dores é uma ferramenta ou um
texto que leva ao mesmo produto.

**Conclusão que os dados impuseram:** o problema hoje não é falta de conteúdo, é
que o conteúdo que existe nunca foi descoberto pelo Google. Publicar mais
calculadora sem consertar a descoberta é encher uma prateleira que ninguém vê.

---

## 1. Situação hoje

**No ar** (conferido no `sitemap.xml` de produção em 28/08/2026): 5 URLs
indexáveis, sendo 3 capazes de atrair alguém por busca.

| URL | O que é |
| --- | --- |
| `/` | home |
| `/ferramentas` | listagem das calculadoras |
| `/ferramentas/custo-do-galao` | única calculadora publicada |
| `/privacidade` | legal |
| `/termos` | legal |

**Na prateleira:** `src/lib/tools.json` declara 7 ferramentas, 6 com
`available: false`. Elas aparecem em `/ferramentas` no bloco "Em breve" desde
09/08/2026. Passadas quase 3 semanas, esses 6 cards deixaram de ser promessa e
viraram prateleira vazia visível para quem chega.

**O que já está pronto e é bom** (não mexer sem motivo):

- `scripts/prerender.mjs` gera um HTML por rota depois do `vite build`, com
  title, description, canonical, OG e JSON-LD próprios, mais o `404.html` e o
  `sitemap.xml`. Desde 31/08/2026 ele também escreve o corpo da página, não só
  o `<head>`. É o que resolveu o "Página alternativa com tag canônica
  adequada" do Search Console (esse motivo está zerado hoje).
- `checkRoutes()` no mesmo script quebra o build se uma rota do `App.tsx` não
  tiver entrada em `src/lib/seo-routes.json` (e vice-versa). Esquecimento de
  publicação não passa.
- `src/components/tools/ToolLayout.tsx` (casca), `NumberField.tsx` (campo que
  aceita vírgula e abre teclado numérico) e `src/components/Seo.tsx` (canonical,
  OG e JSON-LD por rota em tempo de execução).
- `src/lib/tools.ts` + `tools.json` como fonte única: a listagem, o rodapé e o
  JSON-LD leem do mesmo lugar.

**Padrão de qualidade a manter:** `src/pages/ferramentas/CustoDoGalao.tsx` tem
691 linhas com calculadora prefilled, resultado sempre aberto (sem pedir
e-mail), artigo longo, 6 perguntas de FAQ com JSON-LD e link compartilhável com
os valores na query string. É esse nível que ranqueia. Seis calculadoras rasas
rendem menos que três nesse padrão.

---

## 2. O que Search Console e GA4 mostram (28/08/2026)

### Search Console (propriedade de domínio, últimos 3 meses)

| Métrica | Valor |
| --- | --- |
| Cliques | 130 |
| Impressões | 374 |
| CTR média | 34,8% |
| Posição média | 5 |
| Páginas indexadas no domínio inteiro | **2** |
| Sitemaps enviados | **nenhum** |

As 2 páginas indexadas são `https://h2ogestao.com.br/` (rastreada em 18/08) e
`https://app.h2ogestao.com.br/` (19/08). Mais nada. `/ferramentas`,
`/ferramentas/custo-do-galao`, `/privacidade` e `/termos` não estão no índice.

O relatório de páginas do desempenho confirma: só a home da LP (103 cliques, 322
impressões) e a home do app (33 cliques, 188 impressões) aparecem na busca. A
calculadora teve **zero impressão desde que foi publicada**.

A inspeção de URL de `/ferramentas` e de `/ferramentas/custo-do-galao` devolve o
mesmo veredito:

> A página não está indexada: **O Google não reconhece o URL**
> Sitemaps: nenhum sitemap de referência foi detectado
> Página de referência: nenhuma página foi detectada
> Último rastreamento: N/D

Ou seja: nunca foram rastreadas, e o Google não achou nenhum link apontando para
elas.

As consultas são só de marca e são 16 no trimestre inteiro ("h2o login",
"plataforma h2o", "h2o plataforma"). A única consulta de categoria que apareceu
foi "sistema erp para distribuidora de água", com 4 impressões e 0 clique.

Restam ainda 2 URLs classificadas como "Página com redirecionamento", com
validação em falha. É resíduo do www e tem prioridade baixa.

### Duas causas, as duas simples

1. **O sitemap nunca foi enviado.** Ele existe, é gerado no build e está citado
   no `robots.txt`, mas não foi submetido no Search Console, e o próprio
   relatório diz "nenhum sitemap de referência foi detectado".
2. **O HTML servido não tem conteúdo nem links.** O prerender reescreve só o
   `<head>`. O corpo continua sendo `<body><div id="root"></div></body>`, e o
   HTML da home não tem **nenhuma tag `<a>`**. Todo link interno (navbar, rodapé,
   cards) só existe depois que o JavaScript roda. Para um site novo, sem
   autoridade, depender da segunda passada de renderização do Google é
   justamente o que produz o "nenhuma página de referência detectada" acima.
   *(Resolvido em 31/08/2026 pela Fase 1: cada rota sai do build renderizada.)*

### GA4 (propriedade "LP H2O Gestão", últimos 28 dias)

| Métrica | Valor |
| --- | --- |
| Usuários ativos | 628 |
| `/ferramentas` | 50 visualizações, 16 usuários |
| `/ferramentas/custo-do-galao` | 35 visualizações, 12 usuários, 2 min 14 s de engajamento |
| Eventos principais vindos das ferramentas | 0 |

Canais da sessão no mesmo período (1.330 sessões):

| Canal | Sessões | Taxa de engajamento | Eventos principais |
| --- | --- | --- | --- |
| Direct | 522 (39%) | 66,9% | 143 |
| Paid Social | 293 (22%) | 18,4% | 0 |
| Organic Search | 267 (20%) | 69,3% | 83 |
| Organic Social | 124 (9%) | 46,0% | 15 |
| Unassigned | 66 | 74,2% | 32 |
| AI Assistant | 39 | 74,4% | 9 |
| Referral | 17 | 35,3% | 1 |

Leituras que importam:

- **A medição está viva.** O evento `click_start_trial` chegou 11 vezes entre
  21 e 27/08, então o container do GTM e a tag do GA4 estão funcionando. Aquela
  pendência anotada no `index.html` está resolvida.
- **A calculadora engaja quem chega.** 2 min 14 s de engajamento médio é bom.
  O problema é o volume: 12 pessoas em 28 dias, todas vindas de navegação
  interna, nenhuma de busca.
- **Nenhum evento principal sai das ferramentas.** Bate com o achado de código:
  o CTA do `ToolLayout` chama `window.open` direto, fora do `StartTrialButton`.
- **A propriedade mistura LP e app.** As telas mais vistas incluem Vendas,
  Dashboard, Caixa e Entregas, que são do sistema. Direct e Organic Search estão
  inflados por cliente que já usa o produto, então nenhum número de canal aqui
  serve para julgar aquisição sem separar os dois.
- **Paid Social merece uma olhada à parte.** 293 sessões com 18,4% de
  engajamento, tempo médio zerado e nenhum evento principal. Como os eventos
  principais hoje são majoritariamente do app, isso não prova que a campanha não
  converte, mas a taxa de engajamento sozinha já indica que o clique pago está
  quicando. É dinheiro saindo hoje, ao lado de um canal orgânico que ainda não
  foi ligado.

---

## 3. Diagnóstico

### 3.1 A descoberta está quebrada, e isso vem antes de tudo

Duas coisas de custo quase zero (enviar o sitemap) e de custo baixo (colocar
conteúdo no HTML) separam a prateleira atual de existir para o Google. Enquanto
elas não forem feitas, cada calculadora nova nasce invisível, e a frente inteira
não pode ser avaliada: não dá para dizer se conteúdo funciona quando nada foi
sequer rastreado.

As duas foram feitas: o sitemap em 28/08/2026 e o HTML com conteúdo em
31/08/2026. O que falta agora é tempo de rastreamento e a medição da Fase 0.

### 3.2 A infra cobre calculadora, não cobre texto

Não existe nenhum conceito de artigo no projeto: sem lista de conteúdo, sem data
de publicação, sem `Article` nem `BreadcrumbList` no JSON-LD, sem bloco de "leia
também". O `jsonLdFor()` (`scripts/prerender.mjs:69`) é um `if` por caminho
literal, com um ramo para `/ferramentas` e outro para
`/ferramentas/custo-do-galao`.

Com 3 páginas isso é elegante. Com 15 vira um `if` gigante, e cada publicação
mexe em 4 arquivos (`tools.json`, `seo-routes.json`, `App.tsx`,
`prerender.mjs`). Se a meta é volume contínuo, esse custo por publicação precisa
cair antes de escalar, não depois.

### 3.3 As ferramentas não alimentam a medição

O CTA da página de ferramenta (`src/components/tools/ToolLayout.tsx:34`) chama
`window.open` direto, fora do `StartTrialButton`. Ou seja: nenhum
`click_start_trial` sai de uma calculadora, e o GA4 confirma isso com 0 eventos
principais nas duas rotas de ferramenta. A união `AnalyticsEvent`
(`src/lib/analytics.ts:20`) também não tem evento de "calculou" nem de
"compartilhou".

### 3.4 O preview de link não é por rota

`buildHtml()` reescreve `og:title` e `og:description`, mas não reescreve
`og:image`: toda rota compartilha a arte institucional da home
(`public/og-image.jpg`).

Isso bate de frente com o canal real desse público. A calculadora já aceita os
valores por query string, então o dono manda no grupo de WhatsApp um link com o
resultado dele dentro. O preview que aparece é a imagem genérica do site, que é
o oposto do que faz alguém tocar.

### 3.5 Não há conteúdo por termo de busca nem página de comparação

Quem busca "planilha para distribuidora de água", "como controlar vasilhame que
não volta" ou "quanto cobrar de taxa de entrega de galão" não encontra nada
nosso. E o formato que costuma converter melhor, a comparação (sistema x
planilha, sistema x caderno, alternativa a um concorrente), não existe em rota
nenhuma. Calculadora traz visita; comparação traz visita já decidida.

### 3.6 O risco não é técnico, é cadência

O backlog não parou por falta de padrão, parou porque nada obriga a publicar.
"2h por calculadora" só derruba CAC se virar uma publicação por semana durante
meses. Sem fila com data e sem custo de publicação baixo, empaca de novo em duas
semanas.

---

## 4. Plano de ataque

### Fase 0: fazer o Google enxergar o que já existe (FEITO em 28/08/2026)

- `https://h2ogestao.com.br/sitemap.xml` enviado em Search Console > Sitemaps.
- Indexação solicitada para `/ferramentas` e `/ferramentas/custo-do-galao`.

Efeito imediato: a inspeção das duas URLs deixou de dizer "O Google não
reconhece o URL" e passou a dizer "Detectada, mas não indexada no momento", já
citando o sitemap como origem da descoberta. A aba Sitemaps ainda mostra "não
foi possível buscar o sitemap" com última leitura vazia, o que é o estado normal
logo depois do envio (o arquivo responde 200 com `application/xml`, inclusive
para o user agent do Googlebot).

**Pronto quando:** o relatório de indexação mostrar mais de 2 páginas indexadas
no domínio. Linha de base: 2 em 28/08/2026. Vale conferir em uma semana.

### Fase 1: HTML com conteúdo, não só com head (FEITO em 31/08/2026)

O passo que mais muda o resultado e o mais fácil de esquecer, porque no
navegador tudo parece certo.

Caminho seguido: renderizar a mesma árvore do site no build, com
`react-dom/server` e `StaticRouter` (`src/entry-server.tsx`), e escrever o
resultado dentro do `#root` no `scripts/prerender.mjs`. O bloco estático de
links, que era o mínimo aceitável, não foi preciso.

- `src/App.tsx` virou `AppProviders` + `AppRoutes`, para o navegador e o build
  montarem exatamente a mesma coisa.
- `src/main.tsx` hidrata quando o `#root` já vem preenchido, em vez de
  redesenhar tudo por cima do que já está pintado.
- Render vazio derruba o build, como já acontecia com rota fora do
  `seo-routes.json`. É o tipo de falha que passaria despercebida: o site
  continua funcionando no navegador e só o Google perde a página de vista.

O HTML servido saiu de zero tag `<a>` para 8 links internos na home, 9 na
listagem e 9 na calculadora. As respostas do FAQ também passaram a sair
escritas.

Cuidado ao conferir localmente: o `vite preview` devolve o `index.html` da home
em `/ferramentas/custo-do-galao` e fabrica um erro de hidratação que não existe
em produção. Servir o `dist` resolvendo `pasta/index.html`, como a Vercel faz, é
o que reproduz o comportamento real.

**Pronto quando:** `curl` na home devolver o link para `/ferramentas` (feito), e
a inspeção de URL parar de dizer "nenhuma página de referência foi detectada"
(a conferir depois do deploy, junto com um novo pedido de indexação).

### Fase 2: medição por ferramenta e preview por rota (meio dia)

- CTA do `ToolLayout` passando pelo `StartTrialButton`, com `source` da
  ferramenta (ex.: `ferramenta-custo-do-galao`).
- Eventos novos na união `AnalyticsEvent`: `use_tool` (chegou a um resultado) e
  `share_tool` (copiou o link com os valores).
- `og:image` por rota no `prerender.mjs`, com fallback para a arte da home.
- Separar LP e app no GA4 (fluxo ou propriedade), senão nenhum número de
  aquisição é confiável.

**Pronto quando:** um cadastro vindo da calculadora aparece separado no funil.

### Fase 3: encher a prateleira de calculadoras

Ordem já acordada em 09/08, mantida:

1. custo do galão (feito)
2. quanto custa abrir uma distribuidora (maior volume de busca)
3. quanto cobrar de taxa de entrega
4. comissão de entregador
5. taxa da maquininha
6. perda de vasilhame
7. capital preso no fiado

Cada uma no padrão do custo do galão: calculadora prefilled, resultado aberto,
artigo, FAQ com JSON-LD e link compartilhável.

### Fase 4: generalizar o prerender para conteúdo, texto e comparação

- Fonte única de conteúdo com tipo (`tool`, `article`, `compare`), em vez de
  `tools.json` sozinho, com o JSON-LD escolhido pelo tipo e `BreadcrumbList` em
  todas as páginas.
- Bloco de conteúdo relacionado no fim de cada página, montado dessa fonte. É o
  que forma cluster e distribui autoridade interna.
- 2 ou 3 artigos de dor e a primeira comparação (sistema x planilha), usando o
  que já foi escrito nas calculadoras.

---

## 5. Backlog de conteúdo

| Tipo | Assunto | Termo alvo aproximado | Estado |
| --- | --- | --- | --- |
| Ferramenta | Custo do galão | custo do galão de água | No ar, fora do índice |
| Ferramenta | Abrir distribuidora | quanto custa abrir uma distribuidora de água | Fila, próximo |
| Ferramenta | Taxa de entrega | quanto cobrar de taxa de entrega | Fila |
| Ferramenta | Comissão de entregador | quanto pagar de comissão para entregador | Fila |
| Ferramenta | Taxa da maquininha | taxa da maquininha quanto sobra | Fila |
| Ferramenta | Perda de vasilhame | controle de vasilhame perdido | Fila |
| Ferramenta | Capital preso no fiado | quanto tenho de fiado a receber | Fila |
| Artigo | Como controlar vasilhame que não volta | controle de vasilhame distribuidora | A escrever |
| Artigo | Planilha de controle para distribuidora de água | planilha distribuidora de água | A escrever |
| Artigo | Como precificar o galão na revenda | quanto cobrar pelo galão de água | A escrever |
| Comparação | Sistema x planilha | sistema para distribuidora de água | A escrever |
| Comparação | Sistema x caderno de fiado | controle de fiado distribuidora | A escrever |
| Gerador | Comprovante de entrega em PDF | (isca, não busca) | Depois das calculadoras |
| Gerador | Mini catálogo para WhatsApp | (isca, não busca) | Depois das calculadoras |

Geradores convertem melhor que calculadoras, mas custam mais. Ficam para depois
que a fila de calculadoras estiver publicada.

---

## 6. Como publicar uma página nova

Checklist enquanto a Fase 4 não estiver feita:

1. Criar a página em `src/pages/ferramentas/<Nome>.tsx` usando `ToolLayout`,
   `NumberField` e `Seo`.
2. Isolar a conta em `src/lib/<nome>.ts`, sem JSX, para poder testar sozinha.
3. Virar `available: true` em `src/lib/tools.json` (ou incluir a entrada nova).
4. Criar a rota em `src/App.tsx`.
5. Incluir title, description, `changefreq` e `priority` em
   `src/lib/seo-routes.json`. O sitemap sai daí, e sem a entrada o build falha
   avisando.
6. Se a página tiver FAQ, criar o JSON das perguntas em `src/lib/` e ligar no
   `jsonLdFor()` do `prerender.mjs`.
7. Rodar `npm run build` e conferir que saiu `dist/<rota>/index.html` com
   canonical próprio.
8. Depois do deploy, solicitar indexação da URL nova no Search Console.

O link no rodapé e o card na listagem saem sozinhos de `tools.json`, não
precisam de passo próprio.

---

## 7. Como medir

- **Descoberta:** páginas indexadas no relatório de indexação (linha de base:
  2 em 28/08/2026) e impressões por página no Search Console. Essa é a métrica
  da Fase 0 e da Fase 1.
- **Funil:** `page_view` por rota de conteúdo, `use_tool`, `share_tool` e
  `click_start_trial` com `source` da ferramenta.
- **Negócio:** CAC no painel admin (aba Aquisição). O sinal de que a frente está
  funcionando é o CAC caindo enquanto a despesa de anúncio fica igual.

---

## 8. Em aberto

- **Paid Social:** 293 sessões em 28 dias com 18,4% de engajamento e tempo médio
  zerado. Vale investigar em separado, é onde o dinheiro sai hoje.
- **GA4 misturando LP e app:** enquanto os dois estiverem na mesma propriedade,
  os canais de aquisição ficam contaminados por cliente que já usa o sistema.
- **Cadência:** qual ritmo assumir (uma publicação por semana é o que faz essa
  frente valer a pena).
- 2 URLs em "Página com redirecionamento" com validação em falha. Resíduo do
  www, prioridade baixa.
- `/bio` continua com `noindex`, por decisão. Nada a fazer.
