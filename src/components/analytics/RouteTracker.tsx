import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { pushDataLayer } from "@/lib/analytics";

/**
 * `page_view` a cada mudança de rota.
 *
 * A LP é uma SPA: o navegador só carrega a página no primeiro acesso, então a
 * tag de pageview do GTM sozinha contaria uma visita por sessão, e as páginas
 * de ferramentas (as iscas de tráfego) nunca apareceriam no relatório.
 *
 * O título vai junto porque o `<Seo>` de cada rota já o reescreve, e é ele que
 * torna o relatório legível.
 */
export function RouteTracker() {
  const { pathname } = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;

    lastPath.current = pathname;

    // Espera o Seo da rota trocar o title (ele roda em efeito também): sem
    // isto, o pageview levaria o título da página anterior.
    const id = window.setTimeout(() => {
      pushDataLayer({
        event: "page_view",
        page_path: pathname,
        page_title: document.title,
      });
    }, 0);

    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
