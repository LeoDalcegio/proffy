import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";

import logout from "../../assets/images/icons/logout.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

import api from "../../services/api";

import "./styles.css";

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0);

    const { signOut } = useAuth();

    useEffect(() => {
        api.get("connections").then((response) => {
            const { total } = response.data;

            setTotalConnections(total);
        });
    }, []);

    return (
        <div id="page-landing">
            <div id="logout">
                <input type="image" src={logout} onClick={() => signOut()} alt="logout" />
            </div>

            <div id="page-landing-content" className="container">                
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua Plataforma de estudos online</h2>
                </div>

                <img
                    src={landingImg}
                    alt="Plataforma de Estudos"
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar Aulas" />
                        Dar Aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões realizadas{" "}
                    <img src={purpleHeartIcon} alt="Coração Roxo" />
                </span>
            </div>
        </div>
    );
}

export default Landing;
