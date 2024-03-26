import React, { useState, useEffect } from "react";
import "./Calendar.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  updateAppointment,
  selectAppointment,
} from "../../store/appointments/appointmentsSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Calendar = (props) => {
  const [clickedSlot, setClickedSlot] = useState("");
  const [tableData, setTableData] = useState([]);
  const [extraSlotsData, setExtraSlotsData] = useState(
    Array.from({ length: 5 }, () => [])
  );
  const { showExtraSlots } = props;
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [initialSlotsGenerated, setInitialSlotsGenerated] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialSlotsGenerated) {
      generateTable();
      setInitialSlotsGenerated(true);
      dispatch(selectAppointment({ selected: false }));
    }
  }, [showExtraSlots]);

  const generateTimeSlots = (start, end, interval = 30) => {
    const slots = [];
    let currentTime = new Date(start.getTime());

    while (currentTime < end) {
      slots.push(
        currentTime.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      currentTime = new Date(currentTime.getTime() + interval * 60000);
    }

    return slots;
  };

  const generateTable = () => {
    const startDate = new Date();
    const startTime = new Date(startDate.setHours(8, 30, 0, 0));
    const endTime = new Date(startDate.setHours(19, 0, 0, 0));
    const days = [];
    const rows = Array.from({ length: 4 }, () => []);

    for (let i = 0; i < 5; i++) {
      const dayDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const formattedDay = dayDate.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      days.push(formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1));

      const allSlots = generateTimeSlots(startTime, endTime);
      const uniqueSlots = [...new Set(allSlots)]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)
        .sort();

      uniqueSlots.forEach((slot, index) => {
        rows[index].push(slot);
      });

      const remainingSlots = allSlots.filter((slot) => slot > uniqueSlots[3]);
      const extraSlots = remainingSlots
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 5))
        .sort();

      extraSlotsData[i] =
        extraSlots.length > 0 ? extraSlots : Array(4).fill("-");
    }
    setTableData([days, ...rows]);
    setExtraSlotsData(extraSlotsData);
  };

  const handleClick = async (time, date, slotIdentifier) => {
    if (location.pathname == "/search") {
      navigate("/professional");
    } else if (!isAuthenticated) {
      const currentUrl = window.location.href;
      const loginUrl = `/login?redirect=${encodeURIComponent(currentUrl)}`;
      return navigate(loginUrl);
    } else {
      try {
        setClickedSlot(slotIdentifier);
        await dispatch(updateAppointment({ time, date }));
        await dispatch(selectAppointment({ selected: true }));
      } catch (err) {
        console.error("Failed to update appointment", err);
      }
    }
  };

  return (
    <div>
      <table className="table">
        <thead className="table-head">
          <tr>
            {tableData[0]?.map((day, index) => (
              <th className="th" key={index}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {tableData.slice(1, 5).map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="table-row">
              {row.map((slot, slotIndex) => (
                <td
                  key={`slot-${rowIndex}-${slotIndex}`}
                  className="row-margin"
                >
                  <p
                    className={`slots ${
                      clickedSlot === `slot-${rowIndex}-${slotIndex}`
                        ? "slot-clicked"
                        : ""
                    }`}
                    onClick={() =>
                      handleClick(
                        slot,
                        tableData[0][slotIndex],
                        `slot-${rowIndex}-${slotIndex}`
                      )
                    }
                  >
                    {slot}
                  </p>
                </td>
              ))}
              {!showExtraSlots && <td className="row-margin"></td>}
            </tr>
          ))}
          {showExtraSlots &&
            Array.from({ length: 4 }).map((_, extraRowIndex) => {
              const isRowAllPlaceholders = extraSlotsData.every(
                (daySlots) =>
                  daySlots[extraRowIndex] === "-" ||
                  daySlots[extraRowIndex] === undefined
              );

              if (isRowAllPlaceholders) {
                return null;
              }

              return (
                <tr key={`extra-row-${extraRowIndex}`}>
                  {tableData[0].map((_, dayIndex) => (
                    <td
                      key={`extra-slot-${dayIndex}-${extraRowIndex}`}
                      className="row-margin"
                    >
                      <p
                        className={
                          extraSlotsData[dayIndex][extraRowIndex] !==
                            undefined &&
                          extraSlotsData[dayIndex][extraRowIndex] !== "-"
                            ? "slots"
                            : "no-slot"
                        }
                        onClick={() =>
                          handleClick(
                            extraSlotsData[dayIndex][extraRowIndex],
                            tableData[0][extraRowIndex]
                          )
                        }
                      >
                        {extraSlotsData[dayIndex][extraRowIndex] || "-"}
                      </p>
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
