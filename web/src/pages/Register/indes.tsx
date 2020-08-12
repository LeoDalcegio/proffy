import React, { useState, useEffect, FormEvent, useContext } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import proffy from "../../assets/images/proffy.svg";
import backIcon from "../../assets/images/icons/back.svg";

import "./styles.css";
import Input from "../../components/Input";
import AddUser from "../../interfaces/AddUser";

function Register() {
    const [name, setName] = useState("");
    const [surename, setSurename] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signed, signUp } = useAuth();

    function handleSignUp(e: FormEvent) {
        e.preventDefault();

        const user: AddUser = {
            name,
            surename,
            email,
            password,
        };

        signUp(user);
    }

    return (
        <div id="page-register">
            <div id="register-form-container">
                <div className="register-go-back">
                    <Link to="/">
                        <img src={backIcon} alt="Voltar" />
                    </Link>
                </div>
                <form onSubmit={handleSignUp}>
                    <fieldset>
                        <legend>Cadastro</legend>
                        <p>
                            Preencha os dados abaixo                            
                            <p>
                            para começar.
                            </p>
                        </p>
                        <Input
                            name="name"
                            placeholder="Nome"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                        <Input
                            name="surename"
                            placeholder="Sobrenome"
                            value={surename}
                            onChange={(event) => {
                                setSurename(event.target.value);
                            }}
                        />
                        <Input
                            name="email"
                            placeholder="Email"
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
                    <button type="submit">Concluir cadastro</button>
                </form>
            </div>
            <img className="image-proffy-logo" src={proffy}></img>
        </div>
    );
}

export default Register;
