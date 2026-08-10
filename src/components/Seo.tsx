import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  /** Caminho absoluto da página, sem domínio. Ex.: "/ferramentas/custo-do-galao" */
  path: string;
  /** Dados estruturados schema.org, se a página tiver. */
  jsonLd?: Record<string, unknown>;
}

const SITE_URL = "https://h2ogestao.com.br";
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
 * Cobre o Google, que executa JavaScript. Robôs que só leem o HTML servido
 * (preview de link no WhatsApp, por exemplo) continuam vendo o index.html,
 * porque a LP é uma SPA sem prerender.
 */
const Seo = ({ title, description, path, jsonLd }: SeoProps) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const previousTitle = document.title;
    document.title = title;

    const restores = [
      upsertMeta('meta[name="description"]', "name", "description", description),
      upsertMeta('meta[property="og:title"]', "property", "og:title", title),
      upsertMeta(
        'meta[property="og:description"]',
        "property",
        "og:description",
        description,
      ),
      upsertMeta('meta[property="og:url"]', "property", "og:url", url),
    ];

    const canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    const previousCanonical = canonical?.getAttribute("href") ?? null;
    canonical?.setAttribute("href", url);

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = JSON_LD_ID;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
      if (previousCanonical !== null) canonical?.setAttribute("href", previousCanonical);
      script?.remove();
    };
  }, [title, description, path, jsonLd]);

  return null;
};

export default Seo;
