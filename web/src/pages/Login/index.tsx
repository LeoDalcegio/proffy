import React, { useState, useEffect, FormEvent, useContext } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import proffy from "../../assets/images/proffy.svg";

import api from "../../services/api";

import "./styles.css";
import Input from "../../components/Input";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signed, signIn } = useAuth();

    function handleSignIn(e: FormEvent) {
        e.preventDefault();

        signIn(email, password);
    }

    return (
        <div id="page-login">
            <img src={proffy}></img>
            <div id="login-form-container">
                <form onSubmit={handleSignIn}>
                    <fieldset>
                        <legend>Fazer Login</legend>
                        <Input
                            name="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <Input
                            name="password"
                            placeholder="Senha"
                            value={password}
                            type="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </fieldset>
                    <footer>
                        <div>
                            <input
                                onChange={() => {}}
                                type="checkbox"
                                name="remember"
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
