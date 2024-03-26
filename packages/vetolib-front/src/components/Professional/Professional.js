import React from "react";
import './Professional.css';
import { Link, useNavigate } from "react-router-dom";
import CalendarTable from "../Calendar/Calendar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByProfile } from "../../store/search/searchActions";

function Professional(props) {

    const { professional } = props;
    const [showExtraSlots, setShowExtraSlots] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async (person) => {
        try {
            const action = await dispatch(searchByProfile(person));
            if (searchByProfile.fulfilled.match(action)) {
                navigate('/professional');
            }
        } catch (err) {
            console.err('Failed to search', err);
        }
    }

    return (
        <div className="professional-card">
            <div className="professional-info">
                <div className="img-container">
                    <img className="pro-image" src={professional.image} />
                </div>
                <div className="primary-info">
                    <Link to='/professional' className="pro-name" onClick={() => handleClick(professional.id)}>{professional.first_name} {professional.last_name}</Link>
                    <h2 className="pro-job">{professional.job}</h2>
                </div>
                <div className="secondary-info">
                    <h3>{professional.street_name}</h3>
                    <h3>{professional.postcode} {professional.city}</h3>
                </div>
                <Link to='/professional' className="pro-button" onClick={() => handleClick(professional.id)}>PRENDRE RENDEZ-VOUS</Link>
            </div>
            <div className="pro-calendar">
                <CalendarTable showExtraSlots={showExtraSlots}/>
                <div className="btn-container">
                <button className="availability-btn" onClick={() => setShowExtraSlots(!showExtraSlots)}>
                {showExtraSlots ? "VOIR MOINS D'HORAIRES" : "VOIR PLUS D'HORAIRES"}
                </button>
                </div>
            </div>
        </div>
    )
}

export default Professional;