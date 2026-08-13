/**
 * Camada única de analytics da landing page.
 *
 * Tudo sai daqui: o container do GTM é injetado por esta função e os eventos
 * vão para o dataLayer por `pushDataLayer`. Nenhum componente fala com
 * `window.dataLayer` direto, e nenhum ID de medição aparece no código (vêm de
 * variável de ambiente, ver `.env.example`).
 *
 * GA4 e Meta Pixel NÃO são instalados aqui: os dois são tags configuradas
 * dentro do container do GTM, que lê os eventos abaixo. Instalar qualquer um
 * dos dois também no código duplicaria cada pageview.
 */

type AnalyticsEnvironment = "development" | "staging" | "production";

/** Eventos do funil. A união fecha a porta para nome digitado errado. */
export type AnalyticsEvent =
  | { event: "page_view"; page_path: string; page_title: string }
  | { event: "view_pricing"; billing?: "mensal" | "anual" }
  | { event: "click_start_trial"; source: string; plan?: string; billing?: string }
  | { event: "click_whatsapp"; source: string };

type DataLayerEntry = AnalyticsEvent | Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
  }
}

const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

/**
 * Ambiente do dado, e não do build. Vai em toda mensagem para o container
 * conseguir barrar o que não é produção antes de mandar ao GA4/Meta: sem isso,
 * um teste local entra na mesma conta que decide quanto gastar em anúncio.
 */
const ENVIRONMENT: AnalyticsEnvironment =
  (import.meta.env.VITE_ANALYTICS_ENV as AnalyticsEnvironment | undefined) ??
  (import.meta.env.PROD ? "production" : "development");

// Em desenvolvimento os eventos aparecem no console mesmo sem container: dá
// para conferir nome e parâmetros antes de existir GTM configurado.
const DEBUG = ENVIRONMENT !== "production";

function ensureDataLayer() {
  if (typeof window === "undefined") return null;

  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

/**
 * Manda um evento para o dataLayer.
 *
 * Nunca lança: sem GTM (bloqueador de anúncio, container fora do ar, ambiente
 * sem a variável) a fila continua sendo um array na página e a aplicação segue
 * exatamente igual. Analytics não pode ser motivo de tela quebrada.
 */
export function pushDataLayer(payload: AnalyticsEvent) {
  try {
    const dataLayer = ensureDataLayer();
    if (!dataLayer) return;

    dataLayer.push({ ...payload, environment: ENVIRONMENT });

    if (DEBUG) {
      console.debug("[analytics]", payload.event, payload);
    }
  } catch (error) {
    console.warn("[analytics] falha ao enviar evento", error);
  }
}

/**
 * `click_whatsapp` por delegação, num listener só no documento.
 *
 * O link do WhatsApp aparece em vários lugares (botão flutuante, rodapé, página
 * do Instagram) e vai aparecer em outros. Pendurar handler em cada um convida
 * ao esquecimento no próximo link criado; ouvir o clique que sobe até o
 * documento pega todos, inclusive os que ainda não existem.
 *
 * O `source` sai de `data-analytics-source` no link e, sem ele, do caminho da
 * página, que já diz de onde veio.
 */
function trackWhatsappClicks() {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.('a[href*="wa.me"]') as HTMLAnchorElement | null;

      if (!link) return;

      pushDataLayer({
        event: "click_whatsapp",
        source: link.dataset.analyticsSource || window.location.pathname,
      });
    },
    // Fase de captura: o clique é contado mesmo que algum handler no meio do
    // caminho chame stopPropagation.
    true
  );
}

let initialized = false;

/**
 * Injeta o container do GTM (snippet oficial, em versão que lê o ID do
 * ambiente) e deixa na primeira mensagem do dataLayer o que o container precisa
 * saber antes de qualquer tag disparar.
 *
 * Chamada uma vez, no boot. Sem `VITE_GTM_ID` não faz nada, que é o
 * comportamento desejado em desenvolvimento e em qualquer preview.
 */
export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const dataLayer = ensureDataLayer();
  if (!dataLayer) return;

  trackWhatsappClicks();

  // Primeira mensagem, antes do gtm.js: o container já sobe sabendo o ambiente
  // e o pixel a usar. Se entrasse depois, as tags de pageview leriam vazio.
  dataLayer.push({
    environment: ENVIRONMENT,
    site: "landing-page",
    ...(META_PIXEL_ID ? { meta_pixel_id: META_PIXEL_ID } : {}),
  });

  if (!GTM_ID) {
    if (DEBUG) {
      console.debug(
        "[analytics] VITE_GTM_ID não definido: eventos ficam só no dataLayer"
      );
    }
    return;
  }

  dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);
}

/**
 * URL do cadastro no painel. Fica aqui porque é o ponto exato em que o visitante
 * troca de domínio (h2ogestao.com.br → app.h2ogestao.com.br) e a sessão do GA4
 * precisa atravessar junto.
 */
export const REGISTER_URL = "https://app.h2ogestao.com.br/register";
