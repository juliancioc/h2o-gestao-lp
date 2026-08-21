/**
 * Interruptor do teste grátis na LP.
 *
 * Quem concede (ou não) o período é a API: `TRIAL_ENABLED` em
 * `src/utils/subscription-access.ts` do h2o-gestao-api. O painel tem o dele em
 * `src/config-trial.js`. Os três precisam andar juntos: com a API desligada e a
 * página ligada, o visitante clica em "testar grátis" e cai numa conta que já
 * nasce pedindo pagamento.
 *
 * Desligado em 21/08/2026. Para religar, é voltar os três para `true`.
 */
export const TRIAL_ENABLED = false;

/**
 * A copy que muda com o interruptor, junta num lugar só: religar o teste é
 * mudar a constante acima, e não caçar "7 dias" por seis componentes.
 *
 * O evento de analytics continua sendo `click_start_trial` nos dois casos: o
 * nome está configurado no GTM e no GA4, e trocá-lo aqui quebraria o funil
 * histórico sem ensinar nada novo.
 */
export const trialCopy = TRIAL_ENABLED
  ? {
      navbarCta: "Testar grátis",
      heroCta: "Testar grátis por 7 dias",
      heroNote: "Sem cartão de crédito. Acesso na hora.",
      plansCta: "Começar teste grátis",
      finalTitle: "Teste grátis por 7 dias",
      finalSubtitle:
        "Crie sua conta e use o sistema completo por 7 dias, sem cartão de crédito. Depois, planos a partir de R$ 59/mês.",
      finalCta: "Criar minha conta grátis",
    }
  : {
      navbarCta: "Criar conta",
      heroCta: "Criar minha conta",
      heroNote: "Ativação na hora. Planos a partir de R$ 59/mês.",
      plansCta: "Assinar agora",
      finalTitle: "Comece hoje na sua distribuidora",
      finalSubtitle:
        "Crie sua conta, escolha o plano e use o sistema completo. Planos a partir de R$ 59/mês.",
      finalCta: "Criar minha conta",
    };
