import React from "react";
import "./Header.css";
import { MdPerson } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth/authActions";

function Header(){

    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = async() => {
        try {
            await dispatch(logoutUser());
        } catch (err) {
            console.error('Error during logout', err);
        }
    }

    const isActive = (pathname) => location.pathname === pathname;
    
    return (
        <div className="header">
            <div className="logo-wrapper">
                <Link to="/" className="logo">Vetolib</Link>
            </div>
            <div className="account">
                <Link to="/account/appointments" className={`link ${isActive('/account/appointments') ? 'active' : ''}`} id="link-appointment">Mes rendez-vous</Link>
                <Link to="/account/profile" className={`link ${isActive('/account/profile') ? 'active' : ''}`} id="link-profile">Mon profil</Link>
                <div className="connection add-width" onClick={handleLogout}>
                    <MdPerson />
                    <Link to="/" className="link-connection">Se déconnecter</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;