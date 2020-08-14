import React from "react";

import done from '../../assets/images/icons/done.svg'

import { Link } from "react-router-dom";

import "./styles.css";

interface TextareaProps {
  linkButtonTo: string;
  title: string;
  subTitle1: string;
  subTitle2: string;
  buttonDescription: string;
}

const SuccessPageDefault: React.FC<TextareaProps> = ({ linkButtonTo, title, subTitle1, subTitle2, buttonDescription }) => {
    return (
        <div id="success-page-default-image-container">
            <div className="success-page-container">
                <img src={done} alt="Cadastro concluído" />

                <h1>{title}</h1>

                <h2>{subTitle1}</h2>
                <h3>{subTitle2}</h3>

                <Link to={linkButtonTo} >
                    {buttonDescription}
                </Link>                
            </div>    
        </div>
    );
}

export default SuccessPageDefault;
