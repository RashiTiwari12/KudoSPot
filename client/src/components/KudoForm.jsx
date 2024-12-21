import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useContext";
const KudoForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    toperson: "",
    badge: "",
    reason: "",
    user: user?.name,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/kudos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        // Convert object to JSON string
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (!response.redirected) alert("Form submitted successfully!");
      navigate("/kudoslist");
    } catch (error) {
      console.error("Error:", error); // Log error for debugging
      alert("Error submitting form.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-6">
      <h2 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">
        Give Kudos
      </h2>

      {/* toperson Input */}
      <div className="mb-6">
        <input
          type="text"
          id="toperson"
          name="toperson"
          value={formData.toperson}
          onChange={handleChange}
          placeholder="User's name to give kudos"
          className="w-full p-4 bg-indigo-50 border-2 border-indigo-300 rounded-lg text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500"
        />
      </div>

      {/* Badge Input */}
      <div className="mb-6">
        <input
          type="text"
          id="badge"
          name="badge"
          value={formData.badge}
          onChange={handleChange}
          placeholder="Badge"
          className="w-full p-4 bg-indigo-50 border-2 border-indigo-300 rounded-lg text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500"
        />
      </div>

      {/* Reason Input */}
      <div className="mb-6">
        <input
          type="text"
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Reason"
          className="w-full p-4 bg-indigo-50 border-2 border-indigo-300 rounded-lg text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
        >
          GIVE KUDO
        </button>
      </div>
    </div>
  );
};

export default KudoForm;
