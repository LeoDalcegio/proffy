import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import backIcon from "../../assets/images/icons/back.svg";
import proffy from "../../assets/images/proffy.svg";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import AddUser from "../../interfaces/AddUser";
import "./styles.css";

function Register() {
  const [name, setName] = useState("");
  const [surename, setSurename] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInputType, toggleIcon] = usePasswordToggle();

  const history = useHistory();

  const { signUp } = useAuth();

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();

    const user: AddUser = {
      name,
      surename,
      email,
      password,
    };

    signUp(user)
      .then(() => {
        history.push("success-register");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div id="page-register">
      <div id="register-form-container">
        <div className="register-go-back">
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
        </div>
        <form
          onSubmit={async (e) => {
            await handleSignUp(e);
          }}
        >
          <fieldset>
            <legend>Cadastro</legend>
            <p>Preencha os dados abaixo</p>
            <p className="last-line-description-paragraph">para começar.</p>
            <Input
              name="name"
              required
              placeholder="Nome"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <Input
              name="surename"
              placeholder="Sobrenome"
              required
              value={surename}
              onChange={(event) => {
                setSurename(event.target.value);
              }}
            />
            <Input
              name="email"
              placeholder="Email"
              value={email}
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <div id="register-form-password">
              <Input
                name="password"
                placeholder="Senha"
                value={password}
                required
                type={String(passwordInputType)}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <span className="password-toggle-icon">{toggleIcon}</span>
            </div>
          </fieldset>
          <button type="submit">Concluir cadastro</button>
        </form>
      </div>
      <img
        className="image-proffy-logo"
        src={proffy}
        alt="Logo da plataforma proffy"
      ></img>
    </div>
  );
}

export default Register;
