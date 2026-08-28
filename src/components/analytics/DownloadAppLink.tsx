import { pushDataLayer } from "@/lib/analytics";
import { PLAY_STORE_URL } from "@/lib/app";

interface DownloadAppLinkProps {
  /** De onde saiu o clique (secao_app, rodape...). */
  source: string;
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
  className,
  children,
}: DownloadAppLinkProps) {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => pushDataLayer({ event: "click_download_app", source })}
    >
      {children}
    </a>
  );
}
