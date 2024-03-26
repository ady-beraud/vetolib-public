import React from "react";
import "./Card.css";

function Card(props) {
    const {card_img, card_text } = props;
    return (
        <div className="card">
            <img src={card_img} className="card_img"/>
            <p className="card_text">{card_text}</p>
        </div>
    )
}

export default Card;