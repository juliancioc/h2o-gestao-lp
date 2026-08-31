import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { initAnalytics } from "./lib/analytics";
import "./index.css";

// Container do GTM antes do render: o id vem do ambiente (não fica escrito no
// index.html) e as tags precisam estar de pé antes do primeiro page_view.
initAnalytics();

const container = document.getElementById("root")!;

// O build escreve o HTML de cada rota dentro do #root (scripts/prerender.mjs),
// então o normal é hidratar: `createRoot` jogaria fora o que já está pintado e
// desenharia tudo de novo, com piscada. O caminho vazio cobre o `npm run dev`,
// que serve o index.html cru.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
