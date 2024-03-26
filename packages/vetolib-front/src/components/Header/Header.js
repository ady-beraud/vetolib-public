import React from "react";
import "./Header.css";
import { MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";

function Header(){
    return (
        <div className="header">
            <div className="logo-wrapper">
            <Link to="/" className="logo">Vetolib</Link>
            </div>
            <div className="connection">
                <MdPerson />
                <Link to="/login" className="link-connection">Se connecter</Link>
            </div>
        </div>
    )
}

export default Header;