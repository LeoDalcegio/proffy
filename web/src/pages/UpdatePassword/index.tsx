import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import proffy from "../../assets/images/proffy.svg";
import backIcon from "../../assets/images/icons/back.svg";

import "./styles.css";
import Input from "../../components/Input";
import api from "../../services/api";

function UpdatePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    
    const history = useHistory();
    
    async function handleUpdatePassword(e: FormEvent) {
        e.preventDefault();


        await api.post(`/reset-password/${userId}/${token}`, {
            password: newPassword
        });
        
        history.push('/success-send-reset-password-email');
    }

    return (
        <div id="page-update-password">
            <div id="update-password-form-container">
                <div className="update-password-go-back">
                    <Link to="/">
                        <img src={backIcon} alt="Voltar" />
                    </Link>
                </div>
                <form onSubmit={async (e) => {await handleUpdatePassword(e)}}>
                    <fieldset>
                        <legend>Resete a sua senha abaixo</legend>
                        <Input
                            name="new-password"
                            placeholder="Nova senha"
                            value={newPassword}
                            required
                            onChange={(event) => {
                                setNewPassword(event.target.value);
                            }}
                        />

                        <Input
                            name="new-password-confirmation"
                            placeholder="Confirme a senha"
                            value={newPasswordConfirmation}
                            required
                            onChange={(event) => {
                                setNewPasswordConfirmation(event.target.value);
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

export default UpdatePassword;
