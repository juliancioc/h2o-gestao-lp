import { Button, type ButtonProps } from "@/components/ui/button";
import { pushDataLayer, REGISTER_URL } from "@/lib/analytics";

interface StartTrialButtonProps extends Omit<ButtonProps, "asChild"> {
  /** De onde saiu o clique (hero, navbar, planos...). Separa o que converte. */
  source: string;
  /** Plano do cartão clicado, quando o CTA está dentro de um plano. */
  plan?: string;
  billing?: string;
  children: React.ReactNode;
}

/**
 * O CTA de começar o teste. Um componente só para os quatro lugares da página
 * onde ele aparece: assim o evento `click_start_trial` sai sempre com o mesmo
 * nome e os mesmos parâmetros, e mudar o destino é mudar uma linha.
 *
 * É uma âncora de verdade (`Button asChild` + `<a>`), e não um botão com
 * `window.open`. A diferença importa: a LP e o painel são domínios diferentes
 * (h2ogestao.com.br e app.h2ogestao.com.br), e o GA4 só consegue costurar a
 * mesma sessão nos dois lados decorando o link com o parâmetro `_gl` no
 * clique. Isso só acontece em link; `window.open` sai sem decoração e o
 * cadastro apareceria como visita nova, sem origem, quebrando justamente a
 * atribuição da campanha que paga o anúncio.
 */
export function StartTrialButton({
  source,
  plan,
  billing,
  children,
  ...buttonProps
}: StartTrialButtonProps) {
  return (
    <Button asChild {...buttonProps}>
      <a
        href={REGISTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          pushDataLayer({ event: "click_start_trial", source, plan, billing })
        }
      >
        {children}
      </a>
    </Button>
  );
}
