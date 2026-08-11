/**
 * Gera um HTML por rota, o 404 e o sitemap depois do `vite build`.
 *
 * A LP é uma SPA: sem isto o servidor devolveria o mesmo index.html em
 * qualquer URL, com o canonical da home, e o Google marcaria as outras páginas
 * como "Página alternativa com tag canônica adequada" (não indexa). O
 * componente Seo só conserta isso depois que o JavaScript roda, tarde demais
 * para a primeira leitura do robô e inútil para o preview de link do WhatsApp.
 *
 * Como toda rota vira arquivo, o vercel.json não precisa mais do rewrite
 * coringa, e é por isso que uma URL inexistente consegue responder 404 de
 * verdade (a Vercel serve o 404.html quando nenhum arquivo casa).
 *
 * Fontes de dados, todas lidas também pelo site em tempo de execução:
 *   src/lib/seo-routes.json      title, description, noindex e sitemap
 *   src/lib/tools.json           ItemList de /ferramentas
 *   src/lib/faq-custo-do-galao.json  FAQPage da calculadora
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const SITE_URL = "https://h2ogestao.com.br";

const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));

const routes = readJson("src/lib/seo-routes.json");
const tools = readJson("src/lib/tools.json");
const faqCustoDoGalao = readJson("src/lib/faq-custo-do-galao.json");

const urlFor = (path) => `${SITE_URL}${path === "/" ? "/" : path}`;

const escape = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Toda rota do App.tsx precisa estar na tabela: sem arquivo próprio ela
 * responderia 404 em produção, já que não existe mais rewrite coringa.
 */
const checkRoutes = () => {
  const app = readFileSync(join(root, "src/App.tsx"), "utf8");
  const declared = [...app.matchAll(/<Route\s+path="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((path) => path !== "*");

  const missing = declared.filter((path) => !routes[path]);
  if (missing.length > 0) {
    throw new Error(
      `prerender: rota sem entrada em src/lib/seo-routes.json: ${missing.join(", ")}`,
    );
  }

  const extra = Object.keys(routes).filter((path) => !declared.includes(path));
  if (extra.length > 0) {
    throw new Error(
      `prerender: entrada em seo-routes.json sem rota no App.tsx: ${extra.join(", ")}`,
    );
  }
};

/** Dados estruturados por rota, para o robô não depender de renderizar o JS. */
const jsonLdFor = (path) => {
  if (path === "/ferramentas") {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Ferramentas gratuitas para distribuidoras de água",
      itemListElement: tools
        .filter((tool) => tool.available)
        .map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.title,
          url: urlFor(tool.path),
        })),
    };
  }

  if (path === "/ferramentas/custo-do-galao") {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqCustoDoGalao.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    };
  }

  return null;
};

/** Troca uma tag do head e explode se ela sumir do index.html. */
const replaceTag = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) {
    throw new Error(
      `prerender: não encontrei ${label} no index.html. Ajuste o script ou a tag.`,
    );
  }
  return html.replace(pattern, replacement);
};

const buildHtml = (template, { title, description, url, noindex, jsonLd }) => {
  let html = template;

  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`, "o <title>");
  html = replaceTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escape(description)}" />`,
    'o meta name="description"',
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escape(title)}" />`,
    'o meta property="og:title"',
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escape(description)}" />`,
    'o meta property="og:description"',
  );
  html = replaceTag(
    html,
    /<meta name="robots" content="[^"]*" \/>/,
    `<meta name="robots" content="${noindex ? "noindex, nofollow" : "index, follow"}" />`,
    'o meta name="robots"',
  );

  // Página noindex não disputa canonical com ninguém, então sai sem a tag.
  html = replaceTag(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    url ? `<link rel="canonical" href="${url}" />` : "",
    "o link canonical",
  );
  html = replaceTag(
    html,
    /<meta property="og:url" content="[^"]*" \/>\n?\s*/,
    url ? `<meta property="og:url" content="${url}" />\n  ` : "",
    'o meta property="og:url"',
  );

  if (jsonLd) {
    const script = `  <script type="application/ld+json" id="seo-json-ld">${JSON.stringify(
      jsonLd,
    )}</script>\n`;
    html = html.replace("</head>", `${script}</head>`);
  }

  return html;
};

const write = (relativePath, contents) => {
  const file = join(dist, relativePath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents);
  console.log(`prerender: ${relativePath}`);
};

checkRoutes();

const template = readFileSync(join(dist, "index.html"), "utf8");

for (const [path, route] of Object.entries(routes)) {
  const html = buildHtml(template, {
    title: route.title,
    description: route.description,
    url: route.noindex ? null : urlFor(path),
    noindex: Boolean(route.noindex),
    jsonLd: jsonLdFor(path),
  });
  write(path === "/" ? "index.html" : `${path.slice(1)}/index.html`, html);
}

// A Vercel serve este arquivo, com status 404, quando nenhum outro casa.
write(
  "404.html",
  buildHtml(template, {
    title: "Página não encontrada | H2O Gestão",
    description: "O endereço que você abriu não existe no site do H2O Gestão.",
    url: null,
    noindex: true,
    jsonLd: null,
  }),
);

const indexable = Object.entries(routes).filter(([, route]) => !route.noindex);
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    ([path, route]) => `  <url>
    <loc>${urlFor(path)}</loc>
    <changefreq>${route.changefreq ?? "monthly"}</changefreq>
    <priority>${route.priority ?? "0.5"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`,
);
