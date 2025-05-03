import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventDescriptionPage = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/themes", { state: { desc: selectedEvent } });
  };

  const events = [
    "Birthday",
    "Wedding",
    "Corporate Event",
    "Festival",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-blue-50 via-purple-100 to-pink-100">
      <div className="bg-white/90 p-8 sm:p-10 lg:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center backdrop-blur-md">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6">
          Describe Your Occasion
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6">
          Please select your event type to help us choose the best theme.
        </p>

        <div className="mb-6">
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="border-2 border-gray-300 p-4 rounded-xl w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          >
            <option value="">Select Event Type</option>
            {events.map((event, index) => (
              <option key={index} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-indigo-500 text-white py-3 px-8 rounded-xl text-lg shadow-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1"
          disabled={!selectedEvent}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EventDescriptionPage;
