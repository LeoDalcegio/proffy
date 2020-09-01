import React from "react";

import SuccessPageDefault from "../../components/SuccessPageDefault";

function SuccessRegister() {
  return (
    <div id="page-success-register">
      <SuccessPageDefault
        linkButtonTo="/"
        title="Cadastro concluído"
        subTitle1="Agora você faz parte da plataforma da Proffy."
        subTitle2="Tenha uma ótima experiência."
        buttonDescription="Fazer login"
      />
    </div>
  );
}

export default SuccessRegister;
