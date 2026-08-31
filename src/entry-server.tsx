/**
 * Entrada do build para o servidor: transforma uma rota em HTML.
 *
 * Existe por causa da descoberta pelo Google. Até aqui o prerender reescrevia
 * só o `<head>`, e o corpo saía `<div id="root"></div>`, sem uma tag `<a>`
 * sequer: nenhuma página interna tinha link apontando para ela, e o Search
 * Console respondia "nenhuma página de referência foi detectada". Renderizando
 * a mesma árvore do navegador, o HTML já sai com o conteúdo e com os links.
 *
 * Roda no Node, dentro de `scripts/prerender.mjs`, depois do `vite build`.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";

/** @param path caminho da rota, como "/ferramentas/custo-do-galao". */
export function render(path: string) {
  return renderToString(
    <AppProviders>
      <StaticRouter location={path}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
}
