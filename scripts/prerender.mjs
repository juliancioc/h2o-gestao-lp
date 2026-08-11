/**
 * Gera um HTML por rota depois do `vite build`.
 *
 * A LP é uma SPA: sem isto o servidor devolve o mesmo index.html em qualquer
 * URL, com o canonical da home, e o Google marca as outras páginas como
 * "Página alternativa com tag canônica adequada" (não indexa). O componente
 * Seo só conserta isso depois que o JavaScript roda, tarde demais para a
 * primeira leitura do robô e inútil para o preview de link do WhatsApp.
 *
 * A Vercel procura um arquivo antes de aplicar o rewrite do vercel.json, então
 * dist/ferramentas/custo-do-galao/index.html é servido nessa URL e o rewrite
 * continua cobrindo o resto.
 *
 * Os textos vêm de src/lib/seo-routes.json, a mesma fonte que o componente Seo
 * lê em tempo de execução.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const SITE_URL = "https://h2ogestao.com.br";

const routes = JSON.parse(
  readFileSync(join(root, "src/lib/seo-routes.json"), "utf8"),
);

const escape = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Troca uma tag do head e explode se ela sumir do index.html. */
const replaceTag = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) {
    throw new Error(
      `prerender: não encontrei ${label} no index.html. Ajuste o script ou a tag.`,
    );
  }
  return html.replace(pattern, replacement);
};

const template = readFileSync(join(dist, "index.html"), "utf8");

for (const [path, { title, description }] of Object.entries(routes)) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
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
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`,
    "o link canonical",
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
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`,
    'o meta property="og:url"',
  );

  const file = path === "/" ? join(dist, "index.html") : join(dist, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`prerender: ${path} -> ${file.slice(dist.length + 1)}`);
}
