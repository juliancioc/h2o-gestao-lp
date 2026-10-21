import LegalLayout from "@/components/LegalLayout";
import Seo from "@/components/Seo";
import { company } from "@/lib/company";

const Privacidade = () => {
  return (
    <LegalLayout title="Política de Privacidade e LGPD" updatedAt="21 de outubro de 2026">
      <Seo path="/privacidade" />
      <p>
        Esta Política de Privacidade descreve como a {company.razaoSocial},
        inscrita no CNPJ {company.cnpj}, responsável pela plataforma{" "}
        {company.fantasia} ("nós"), coleta, utiliza, armazena e protege os dados
        pessoais dos usuários, em conformidade com a Lei Geral de Proteção de
        Dados (Lei nº 13.709/2018 - LGPD). Ela vale para o painel web e para o
        aplicativo {company.fantasia} para Android e iOS.
      </p>

      <h2 id="dados-coletados">1. Dados que coletamos</h2>
      <p>
        Coletamos apenas os dados necessários para o funcionamento da plataforma,
        incluindo:
      </p>
      <ul>
        <li>Dados de cadastro: nome, e-mail, telefone e dados da empresa.</li>
        <li>
          Dados operacionais inseridos por você: clientes, pedidos, vendas,
          galões, fiado e informações financeiras da sua distribuidora.
        </li>
        <li>
          Dados de uso e técnicos: registros de acesso, endereço IP e
          informações do dispositivo, usados para segurança e melhoria do
          serviço.
        </li>
        <li>
          No aplicativo: o identificador do aparelho para notificações (token de
          push), o sistema operacional e o registro de uso do app (quando ele
          está aberto e qual tela está em uso), usado para medir o tempo de uso.
        </li>
      </ul>
      <p>
        O aplicativo não acessa sua localização, câmera, microfone, contatos
        nem fotos, e não rastreia você em apps ou sites de terceiros.
      </p>

      <h2 id="finalidade">2. Como usamos seus dados</h2>
      <p>Utilizamos seus dados para:</p>
      <ul>
        <li>Fornecer e operar as funcionalidades da plataforma.</li>
        <li>Realizar cobranças e gerenciar sua assinatura.</li>
        <li>Prestar suporte e comunicar avisos importantes do serviço.</li>
        <li>Garantir a segurança e prevenir fraudes.</li>
        <li>
          Enviar notificações no aplicativo, como o aviso de entrega nova para o
          entregador. O token de push é apagado quando você sai da conta no
          aparelho, e as notificações podem ser desativadas nas configurações
          do celular.
        </li>
      </ul>
      <p>
        Não vendemos seus dados pessoais e não os compartilhamos com terceiros
        para fins de marketing. Para entregar as notificações do aplicativo,
        usamos os serviços de push da Apple (APNs), do Google (Firebase Cloud
        Messaging) e da Expo, que recebem apenas o token do aparelho e o
        conteúdo do aviso.
      </p>

      <h2 id="armazenamento">3. Armazenamento e segurança</h2>
      <p>
        Seus dados são armazenados em servidores seguros, com criptografia em
        trânsito e backups diários automáticos. Adotamos medidas técnicas e
        organizacionais para proteger as informações contra acesso não
        autorizado, perda ou alteração indevida.
      </p>

      <h2 id="lgpd">4. Seus direitos como titular (LGPD)</h2>
      <p>
        Nos termos da LGPD, você pode, a qualquer momento, solicitar: confirmação
        e acesso aos seus dados, correção de dados incompletos ou desatualizados,
        anonimização ou eliminação de dados, portabilidade e revogação de
        consentimento.
      </p>
      <p>
        Para exercer seus direitos, entre em contato pelo e-mail{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2 id="retencao">5. Retenção e exclusão</h2>
      <p>
        Mantemos seus dados enquanto sua conta estiver ativa. Após o
        encerramento, os dados podem ser mantidos pelo período legal necessário e,
        em seguida, eliminados de forma segura.
      </p>
      <p>
        Para excluir sua conta e seus dados, inclusive se você usa só o
        aplicativo, envie o pedido para{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2 id="contato">6. Contato do controlador</h2>
      <p>
        {company.razaoSocial}
        <br />
        CNPJ: {company.cnpj}
        <br />
        E-mail: <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>
    </LegalLayout>
  );
};

export default Privacidade;
