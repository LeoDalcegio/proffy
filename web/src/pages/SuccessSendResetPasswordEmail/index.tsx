import React from "react";

import SuccessPageDefault from "../../components/SuccessPageDefault";

function SuccessSendResetPasswordEmail() {
  return (
    <div id="page-success-send-reset-password-email">
      <SuccessPageDefault
        linkButtonTo="/"
        title="Redefinição enviada!"
        subTitle1="Boa, agora é só checar o e-mail que foi enviado para você"
        subTitle2="redefinir sua senha e aproveitar os estudos."
        buttonDescription="Voltar ao login"
      />
    </div>
  );
}

export default SuccessSendResetPasswordEmail;
