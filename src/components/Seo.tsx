import { useEffect } from "react";
import seoRoutes from "@/lib/seo-routes.json";

interface SeoRoute {
  title: string;
  description: string;
}

interface SeoProps {
  /** Caminho absoluto da página, sem domínio. Ex.: "/ferramentas/custo-do-galao" */
  path: string;
  /** Dados estruturados schema.org, se a página tiver. */
  jsonLd?: Record<string, unknown>;
}

const SITE_URL = "https://h2ogestao.com.br";
const routes = seoRoutes as Record<string, SeoRoute>;

/** A home responde em "/", as demais sem barra no fim. */
const urlFor = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

const JSON_LD_ID = "seo-json-ld";

const upsertMeta = (selector: string, attr: string, key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  const previous = element.getAttribute("content");
  element.setAttribute("content", content);
  return () => {
    if (previous !== null) element?.setAttribute("content", previous);
  };
};

/**
 * Ajusta title, description, canonical e Open Graph por rota.
 *
 * Os textos vêm de `src/lib/seo-routes.json`, a mesma fonte que o
 * `scripts/prerender.mjs` usa para gerar um HTML por rota no build. Sem isso o
 * servidor devolveria o index.html em qualquer URL, com o canonical da home, e
 * o Google trataria as outras páginas como cópia dela.
 */
const Seo = ({ path, jsonLd }: SeoProps) => {
  useEffect(() => {
    const route = routes[path];
    if (!route) {
      console.error(`Seo: rota "${path}" não está em src/lib/seo-routes.json`);
      return;
    }

    const url = urlFor(path);
    const previousTitle = document.title;
    document.title = route.title;

    const restores = [
      upsertMeta('meta[name="description"]', "name", "description", route.description),
      upsertMeta('meta[property="og:title"]', "property", "og:title", route.title),
      upsertMeta(
        'meta[property="og:description"]',
        "property",
        "og:description",
        route.description,
      ),
      upsertMeta('meta[property="og:url"]', "property", "og:url", url),
    ];

    const canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    const previousCanonical = canonical?.getAttribute("href") ?? null;
    canonical?.setAttribute("href", url);

    // O prerender já escreve este bloco no HTML de quem abre a URL direto.
    // Aqui só atualizamos o que existe, senão a página fica com dois.
    let created: HTMLScriptElement | null = null;
    let existing: HTMLScriptElement | null = null;
    let previousJsonLd: string | null = null;

    if (jsonLd) {
      existing = document.head.querySelector<HTMLScriptElement>(`#${JSON_LD_ID}`);
      if (existing) {
        previousJsonLd = existing.text;
        existing.text = JSON.stringify(jsonLd);
      } else {
        created = document.createElement("script");
        created.type = "application/ld+json";
        created.id = JSON_LD_ID;
        created.text = JSON.stringify(jsonLd);
        document.head.appendChild(created);
      }
    }

    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
      if (previousCanonical !== null) canonical?.setAttribute("href", previousCanonical);
      if (existing && previousJsonLd !== null) existing.text = previousJsonLd;
      created?.remove();
    };
  }, [path, jsonLd]);

  return null;
};

export default Seo;
