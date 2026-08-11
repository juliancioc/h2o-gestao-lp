import LegalLayout from "@/components/LegalLayout";
import Seo from "@/components/Seo";
import { company } from "@/lib/company";

const Privacidade = () => {
  return (
    <LegalLayout title="Política de Privacidade e LGPD" updatedAt="15 de junho de 2026">
      <Seo path="/privacidade" />
      <p>
        Esta Política de Privacidade descreve como a {company.razaoSocial},
        inscrita no CNPJ {company.cnpj}, responsável pela plataforma{" "}
        {company.fantasia} ("nós"), coleta, utiliza, armazena e protege os dados
        pessoais dos usuários, em conformidade com a Lei Geral de Proteção de
        Dados (Lei nº 13.709/2018 - LGPD).
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
      </ul>

      <h2 id="finalidade">2. Como usamos seus dados</h2>
      <p>Utilizamos seus dados para:</p>
      <ul>
        <li>Fornecer e operar as funcionalidades da plataforma.</li>
        <li>Realizar cobranças e gerenciar sua assinatura.</li>
        <li>Prestar suporte e comunicar avisos importantes do serviço.</li>
        <li>Garantir a segurança e prevenir fraudes.</li>
      </ul>
      <p>
        Não vendemos seus dados pessoais e não os compartilhamos com terceiros
        para fins de marketing.
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
