import React, { useState, FormEvent, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import usePasswordToggle from "../../hooks/usePasswordToggle";

import proffy from "../../assets/images/proffy.svg";

import "./styles.css";
import Input from "../../components/Input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState("");
  const [passwordInputType, toggleIcon] = usePasswordToggle();

  const history = useHistory();

  const { signed, signIn } = useAuth();

  function handleSignIn(e: FormEvent) {
    e.preventDefault();

    signIn(email, password, !!remember).catch((error) => {
      alert(error);
    });
  }

  useEffect(() => {
    if (signed) history.push("landing");
  }, [signed]);

  return (
    <div id="page-login">
      <img src={proffy} alt="Logo da plataforma proffy"></img>
      <div id="login-form-container">
        <form onSubmit={handleSignIn}>
          <fieldset>
            <legend>Fazer Login</legend>
            <Input
              name="email"
              placeholder="E-mail"
              value={email}
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <div id="login-form-password">
              <Input
                name="password"
                placeholder="Senha"
                required
                value={password}
                type={String(passwordInputType)}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <span className="password-toggle-icon">{toggleIcon}</span>
            </div>
          </fieldset>
          <footer>
            <div>
              <input
                type="checkbox"
                name="remember"
                value="check"
                onChange={(event) => {
                  setRemember(event.target.value);
                }}
              />
              <label htmlFor="remember">Lembrar</label>
            </div>

            <Link to="/forgot-password">
              <label>Esqueci minha senha</label>
            </Link>
          </footer>
          <button type="submit">Entrar</button>
        </form>
        <div className="signup">
          <p>Não tem conta?</p>
          <Link to="/register">
            <label>Cadastre-se</label>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
