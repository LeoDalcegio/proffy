import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import proffy from "../../assets/images/proffy.svg";
import backIcon from "../../assets/images/icons/back.svg";

import "./styles.css";
import Input from "../../components/Input";
import api from "../../services/api";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    
    const history = useHistory();
    
    async function handleForgotPassword(e: FormEvent) {
        e.preventDefault();

        await api.post(`/send-reset-password-email/${email}`);

        history.push('/');
    }

    return (
        <div id="page-forgot-password">
            <div id="forgot-password-form-container">
                <div className="forgot-password-go-back">
                    <Link to="/">
                        <img src={backIcon} alt="Voltar" />
                    </Link>
                </div>
                <form onSubmit={async (e) => {await handleForgotPassword(e)}}>
                    <fieldset>
                        <legend>Eita, esqueceu sua senha?</legend>
                        <p>Não esquenta, vamos dar um jeito nisso.</p>
                        <Input
                            name="email"
                            placeholder="Email"
                            value={email}
                            required
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    
                    </fieldset>
                    <button type="submit">Enviar</button>
                </form>
            </div>
            <img className="image-proffy-logo" src={proffy} alt="Logo da plataforma Proffy"></img>
        </div>
    );
}

export default ForgotPassword;
