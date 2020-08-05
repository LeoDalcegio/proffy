import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

const TeacherItem: React.FC = () => {
    return (
        <article className="teacher-item">
            <header>
                <img
                    src="https://avatars3.githubusercontent.com/u/48610849?s=400&u=b87b4da4bc8910952bc89fd151c6cbdbc6b724ed&v=4"
                    alt="Leonardo Luís Dalcegio"
                />
                <div>
                    <strong>Leonardo Luís Dalcegio</strong>
                    <span>Química</span>
                </div>
            </header>

            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Incidunt
                <br /> <br />
                repudiandae, accusantium architecto, voluptate corporis
                obcaecati
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 140,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="WhatsApp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
};

export default TeacherItem;
