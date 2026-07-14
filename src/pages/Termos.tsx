import LegalLayout from "@/components/LegalLayout";
import { company } from "@/lib/company";

const Termos = () => {
  return (
    <LegalLayout title="Termos de Uso" updatedAt="15 de junho de 2026">
      <p>
        Estes Termos de Uso regem o acesso e a utilização da plataforma{" "}
        {company.fantasia}, oferecida pela {company.razaoSocial}, inscrita no
        CNPJ {company.cnpj}. Ao contratar ou utilizar o serviço, você concorda
        com as condições abaixo.
      </p>

      <h2 id="servico">1. O serviço</h2>
      <p>
        O {company.fantasia} é uma plataforma de gestão (ERP) voltada a
        distribuidoras de água, que permite o controle de pedidos, clientes,
        estoque de galões, fiado, fechamento de caixa e relatórios financeiros.
      </p>

      <h2 id="assinatura">2. Assinatura e pagamento</h2>
      <ul>
        <li>
          O serviço é oferecido por assinatura mensal, conforme o plano
          contratado (valores vigentes na página de planos no momento da
          contratação).
        </li>
        <li>Não há taxa de adesão nem fidelidade.</li>
        <li>
          Você pode cancelar a qualquer momento, sem multa, deixando de ser
          cobrado nos ciclos seguintes.
        </li>
      </ul>

      <h2 id="garantia">3. Garantia de 7 dias</h2>
      <p>
        Caso não fique satisfeito, você pode solicitar o cancelamento em até 7
        (sete) dias corridos a partir da contratação e receberá a devolução
        integral do valor pago. Basta entrar em contato pelo e-mail{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a> ou pelo WhatsApp.
      </p>

      <h2 id="responsabilidades">4. Responsabilidades do usuário</h2>
      <ul>
        <li>
          Manter a confidencialidade das credenciais de acesso à sua conta.
        </li>
        <li>
          Garantir a veracidade dos dados cadastrados e utilizar a plataforma de
          acordo com a legislação vigente.
        </li>
        <li>Não utilizar o serviço para fins ilícitos.</li>
      </ul>

      <h2 id="disponibilidade">5. Disponibilidade</h2>
      <p>
        Empenhamo-nos para manter a plataforma disponível e segura, com backups
        diários. Eventuais manutenções programadas serão comunicadas sempre que
        possível.
      </p>

      <h2 id="privacidade">6. Privacidade</h2>
      <p>
        O tratamento de dados pessoais segue a nossa{" "}
        <a href="/privacidade">Política de Privacidade</a>, em conformidade com a
        LGPD.
      </p>

      <h2 id="contato">7. Contato</h2>
      <p>
        Dúvidas sobre estes Termos podem ser enviadas para{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
    </LegalLayout>
  );
};

export default Termos;
