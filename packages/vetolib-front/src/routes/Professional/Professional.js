import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Account_Header from "../../components/Account_Header/Header";
import { useSelector } from "react-redux";
import "./Professional.css";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdEuro } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import CalendarTable from "../../components/Calendar/Calendar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLoginStatus } from "../../store/auth/authActions";
import { updateAppointment } from "../../store/appointments/appointmentsSlice";
import { useNavigate } from "react-router-dom";

function Professional() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { searchResults } = useSelector((state) => state.search);
  const { date, time, selected } = useSelector((state) => state.appointments);
  const professional = searchResults[0];
  const [showExtraSlots, setShowExtraSlots] = useState(false);
  const [noSelection, setNoSelection] = useState(false);
  const [selectValue, setSelectValue] = useState(user?.animals?.[0] ?? "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        await dispatch(checkLoginStatus(user.id));
      } catch (err) {
        console.error("Failed to get login status", err);
      }
    };

    checkStatus();
    setNoSelection(false);
  }, []);

  const handleClick = async () => {
    if (!isAuthenticated) {
      const currentUrl = window.location.href;
      const loginUrl = `/login?redirect=${encodeURIComponent(currentUrl)}`;
      return navigate(loginUrl);
    } else if (!selected) {
      setNoSelection(true);
    } else {
      try {
        await dispatch(
          updateAppointment({ professional_id: professional.id, animal: "" })
        );
        let href = "";
        if (professional.price === "50.00") {
          href = "https://buy.stripe.com/test_cN24jL5IUalfcdWcMM";
        } else if (professional.price === "60.00") {
          href = "https://buy.stripe.com/test_9AQ2bD2wI8d791K5kl";
        } else {
          href = "https://buy.stripe.com/test_4gw8A19ZaeBvguc7su";
        }
        window.location.href = href;
      } catch (err) {
        console.error("Failed to update appointment", err);
      }
    }
  };

  return (
    <div className="professional-page">
      {isAuthenticated ? <Account_Header /> : <Header />}
      <div>
        <div className="professional-profile">
          <img className="professional-img" src={professional.image} />
          <div className="professional-details">
            <h1 className="professional-name">
              {professional.first_name} {professional.last_name}
            </h1>
            <h2 className="professional-job">{professional.job}</h2>
          </div>
        </div>
        <div className="cards-container">
          <div className="professional-cards">
            <div className="icon-info">
              <IoLocationSharp size="1rem" />
              <h3 className="card-title">Addresse et informations d'accès</h3>
            </div>
            <p className="card-info">
              {professional.street_name}, {professional.postcode}{" "}
              {professional.city}
            </p>
            {professional.digicode ? (
              <div>
                <h3 className="card-subtitle">Digicode</h3>
                <p className="card-info">{professional.digicode}</p>
              </div>
            ) : null}
            <div className="icon-info">
              <FaPhoneAlt size="1rem" />
              <h3 className="card-title">Coordonnées</h3>
            </div>
            <p className="card-info">{professional.telephone}</p>
          </div>
          <div className="professional-cards">
            <div className="icon-info">
              <MdPerson size="1rem" />
              <h3 className="card-title">Présentation</h3>
            </div>
            <p className="card-info">{professional.presentation}</p>
          </div>
          <div className="professional-cards">
            <div className="icon-info">
              <AiOutlineSchedule size="1rem" />
              <h3 className={`card-title ${noSelection ? "red" : ""}`}>
                Disponibilité
              </h3>
            </div>
            <h5
              className={`card-subtitle add-margin ${noSelection ? "red" : ""}`}
            >
              Sélectionnez le rendez-vous :
            </h5>
            <div className="calendar-container">
              <div className="pro-calendar remove-margin">
                <CalendarTable showExtraSlots={showExtraSlots} />
                <div className="btn-container">
                  <button
                    className="availability-btn"
                    onClick={() => setShowExtraSlots(!showExtraSlots)}
                  >
                    {showExtraSlots
                      ? "VOIR MOINS D'HORAIRES"
                      : "VOIR PLUS D'HORAIRES"}
                  </button>
                </div>
              </div>
            </div>
            <div
              className={
                isAuthenticated && user?.animals?.[0]
                  ? "animal-appointment"
                  : "hidden"
              }
            >
              <h5 className="card-subtitle add-margin">
                Sélectionnez votre animal :
              </h5>
              <select
                className="select-animal"
                defaultValue={""}
                onChange={(e) => setSelectValue(e.target.value)}
              >
                {user &&
                  user.animals &&
                  user.animals.map((animal, index) => (
                    <option key={`${animal}-${index}`} value={animal}>
                      {animal}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="professional-cards">
            <div className="icon-info">
              <MdEuro size="1rem" />
              <h3 className="card-title">Tarif</h3>
            </div>
            <div className="pro-price card-info">
              <p>Prix</p>
              <p>{professional.price}€</p>
            </div>
          </div>
          <div className={`professional-cards ${selected ? "" : "recap"}`}>
            <div className="icon-info">
              <IoIosCheckbox size="1rem" />
              <h3 className="card-title">Récapitulatif</h3>
            </div>
            <p className="card-info">
              <span className="highlight">Rendez-vous avec&nbsp;</span>
              {`${professional.first_name} ${professional.last_name}`}&nbsp;
              <span className="highlight">le&nbsp;</span>
              {date}&nbsp;<span className="highlight">à&nbsp;</span>
              {time}
              <span className="highlight">
                &nbsp;{`${selectValue ? "pour" : "."}`}
              </span>
              &nbsp;{`${selectValue ? `${selectValue}.` : ""}`}
            </p>
          </div>
          <div className="pro-pay">
            <button className="payment" onClick={handleClick}>
              PAYER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Professional;
