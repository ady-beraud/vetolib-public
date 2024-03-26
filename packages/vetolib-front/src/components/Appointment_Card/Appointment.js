import React, { useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdOutlineSchedule } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import "./Appointment.css";
import { useSelector } from "react-redux";

function AppointmentCard(props) {
  const { appointment, isSelected, onClick } = props;
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="appointment" onClick={onClick}>
      <div className={`date_time ${isSelected ? "blue" : ""}`}>
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
      <div className="info_appointment border">
        <p className="space">
          <MdPerson className="svg" />
          {user?.google_name
            ? user.google_name
            : `${user?.first_name} ${user?.last_name}`}
        </p>
      </div>
    </div>
  );
}

export default AppointmentCard;
