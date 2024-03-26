import React, { useEffect } from "react";
import AppointmentCard from "../../components/Appointment_Card/Appointment";
import Appointment_Details from "../../components/Appointment_Details/Appointment";
import Header from "../../components/Account_Header/Header";
import "./Appointments.css";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginStatus } from "../../store/auth/authActions";
import {
  createAppointment,
  findAppointments,
} from "../../store/appointments/appointmentsActions";
import { useState } from "react";

function Appointments() {
  const dispatch = useDispatch();
  const { date, time, professional_id, animal, appointments } = useSelector(
    (state) => state.appointments
  );
  const { user } = useSelector((state) => state.auth);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(
    appointments[0]?.id ? appointments[0].id : false
  );

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const userId = user && user.id ? user.id : undefined;
        await dispatch(checkLoginStatus(userId));
      } catch (err) {
        console.error("Failed to get login status", err);
      }
    };

    checkStatus();

    const searchParams = new URLSearchParams(window.location.search);

    const saveAppointment = async () => {
      try {
        await dispatch(
          createAppointment({
            date,
            time,
            professional_id,
            user_id: user.id,
            animal,
          })
        );
        searchParams.delete("payment");
        await getAppointments();
      } catch (err) {
        console.error("Failed to create appointment", err);
      }
    };

    const getAppointments = async () => {
      try {
        const userId = user && user.id ? user.id : undefined;
        await dispatch(findAppointments(userId));
      } catch (err) {
        console.error("Failed to get appointments", err);
      }
    };

    if (searchParams.get("payment") === "true") {
      saveAppointment();
    } else {
      getAppointments();
    }
  }, []);

  const handleAppointmentClick = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
  };

  return (
    <div className="height_page">
      <Header />
      <div className="appointment_page">
        <div className="appointment_cards">
          <h1>Rendez-vous</h1>
          <div>
            {appointments &&
              appointments.map((appointment) => (
                <div className="card" key={appointment.id}>
                  <AppointmentCard
                    appointment={appointment}
                    isSelected={appointment.id === selectedAppointmentId}
                    onClick={() => handleAppointmentClick(appointment.id)}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="appointment_details">
          <Appointment_Details
            appointment={
              appointments &&
              appointments.find(
                (appointment) => appointment.id === selectedAppointmentId
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Appointments;
