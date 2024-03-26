import React, { useEffect } from "react";
import "./Info.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchAllProfessionals } from "../../store/search/searchActions";

function Info(props){
    const { paragraph, img_src, button, link_to } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth);

    const searchAll = async () => {
        try {
            await dispatch(searchAllProfessionals());
        } catch (err) {
            console.error('Failed to get all professionals', err);
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (link_to == '/search') {
            searchAll().then(() => {
                navigate(link_to);
            });
        } else {
            if (isAuthenticated) {
                navigate('/account/appointments');
            } else {
                navigate(link_to);
            }
        }
    }

    return (
        <div className="info">
            <div className="info_top">
            <p className="info_text">{paragraph}</p>
            <img src={img_src} className="info_img"/>
            </div>
            <div className="info_bottom">
            <a to={link_to} className="info_button" onClick={handleClick}>{button}</a>
            </div>
        </div>
    )
}

export default Info;