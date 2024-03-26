import React from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdOutlineSchedule } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaDoorOpen } from "react-icons/fa";
import "./Appointment.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Appointment_Details(props) {
  const { appointment } = props;
  const { user } = useSelector((state) => state.auth);

  if (!appointment) {
    return (
      <div className="details">
        <div className="no-appointments">
          <img src="/calendar.png" className="calendar-img" />
          <h2>Aucun rendez-vous à venir</h2>
          <p>Prenez rendez-vous en ligne à tout moment.</p>
          <Link to="/search" className="no-appointments-link">
            PRENDRE UN RENDEZ-VOUS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="details">
      <div className="date_time blue">
        <p>
          <AiOutlineSchedule className="svg" /> {appointment.date}
        </p>
        <p className="p-margin">
          <MdOutlineSchedule className="svg" />
          {`${appointment?.time?.hours}:${
            appointment?.time?.minutes ? appointment?.time?.minutes : "00"
          }`}
        </p>
      </div>
      <div className="info_appointment separate">
        <p className="bold">
          {appointment.professional_first_name}{" "}
          {appointment.professional_last_name}
        </p>
        <p>{appointment.professional_job}</p>
      </div>
      <div className="info_appointment separate">
        <p className="bold space">Client</p>
        <p className="space">
          <MdPerson className="svg" />
          {user?.google_name
            ? user.google_name
            : `${user?.first_name} ${user?.last_name}`}
        </p>
      </div>
      <div className="info_appointment separate">
        <p className="bold space smaller">
          <FaPhoneAlt className="svg" />
          Téléphone du lieu de rendez-vous
        </p>
        <p className="blue-text">{appointment.professional_tel}</p>
      </div>
      <div className="info_appointment separate">
        <p className="bold space smaller">
          <IoLocationSharp className="svg" />
          Se rendre au rendez-vous
        </p>
        <p className="blue-text">{appointment.professional_street_name}</p>
        <p className="blue-text">
          {appointment.professional_postcode} {appointment.professional_city}
        </p>
      </div>
      <div className="info_appointment">
        <p className="bold space smaller">
          <FaDoorOpen className="svg" />
          Digicode
        </p>
        <p>{appointment.professional_digicode}</p>
      </div>
    </div>
  );
}

export default Appointment_Details;
