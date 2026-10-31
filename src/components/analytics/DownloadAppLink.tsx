import { pushDataLayer } from "@/lib/analytics";
import { APP_STORE_URLS, type AppStore } from "@/lib/app";

interface DownloadAppLinkProps {
  /** De onde saiu o clique (secao_app, rodape...). */
  source: string;
  /** Loja de destino; vai no evento para separar Android de iPhone. */
  store: AppStore;
  className?: string;
  children: React.ReactNode;
}

/**
 * O link de baixar o aplicativo, num componente só para os lugares da página
 * onde ele aparece.
 *
 * Baixar não é conversão: quem instala precisa de uma conta H2O Gestão, então
 * o clique aqui separa dois públicos que a página atende ao mesmo tempo (o
 * visitante que ainda vai assinar e o cliente que só quer instalar no celular
 * do entregador). Por isso o evento é `click_download_app`, e não mais um
 * `click_start_trial`: misturar os dois estragaria a taxa de conversão do
 * funil que paga o anúncio.
 */
export function DownloadAppLink({
  source,
  store,
  className,
  children,
}: DownloadAppLinkProps) {
  return (
    <a
      href={APP_STORE_URLS[store]}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        pushDataLayer({ event: "click_download_app", source, store })
      }
    >
      {children}
    </a>
  );
}
