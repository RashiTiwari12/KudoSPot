import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useContext";
import axios from "axios";
const KudosList = () => {
  const [kudosList, setKudosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [kudoId, setKudoId] = useState();
  const { user, setUser } = useUser();
  useEffect(() => {
    // Fetch the data when the component mounts
    const fetchKudos = async () => {
      try {
        const response = await fetch("/kudos");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (response.redirected) navigate("/");
        const data = await response.json();

        setKudosList(data); // Update state with fetched data
      } catch (error) {
        setError(error.message); // Update error state
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };
    if (user) fetchKudos();
    else navigate("/");
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleGiveKudos = () => {
    navigate("/kudosform");
  };
  const handleClickAnalytics = () => {
    navigate("/kudosanalytics");
  };
  const handlelogout = () => {
    document.cookie = `email=`;
    setUser(null);
    navigate("/");
    if (user === null) {
      alert("No user is logged In");
    }
  };
  const handleClickLike = async (id) => {
    if (!user) {
      alert("User not logged in");
      return;
    }

    // Check if this kudo has already been liked

    if (!id || !user) {
      console.error("Missing kudoId or user data");
      return;
    }

    setKudoId(id); // Set the kudoId when the like button is clicked

    try {
      const response = await axios.post(
        `/kudos/liked`,
        {
          kudoId: id,
          likedby: user.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success response (status 200)

      alert(response.data.message);
      setLiked((prevLikedMap) => ({
        ...prevLikedMap,
        [id]: true, // Mark this kudo as liked
      }));
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(
          error.response.data.message ||
            "An error occurred while liking the kudos."
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("No response received from the server.");
      } else {
        console.error("Error message:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="absolute top-4 right-4 flex flex-wrap gap-2">
        <button
          onClick={handleGiveKudos}
          className="px-4 py-2 text-sm text-white font-medium rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
        >
          Give Kudo
        </button>
        <button
          onClick={handleClickAnalytics}
          className="px-4 py-2 text-sm text-white font-medium rounded-lg shadow-md bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        >
          Kudo's Analytics
        </button>
        <button
          onClick={handlelogout}
          className="px-4 py-2 text-sm text-white font-medium rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
        >
          Logout
        </button>
      </div>

      <div className="mt-24 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800">
          WELCOME {user?.name} TO KUDO SPOT
        </h1>
      </div>

      {kudosList.length > 0 ? (
        <ul className="space-y-6 mt-20 max-w-3xl mx-auto px-6">
          {kudosList.map((kudo) => (
            <li
              key={kudo._id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-blue-100"
            >
              {/* Title and Badge section */}
              <div className="flex justify-between items-center text-xl font-semibold text-indigo-700 hover:text-indigo-800 space-x-4">
                <div className="w-1/2 text-indigo-600">
                  <strong className="text-xl">To:</strong> {kudo.toperson}
                </div>
                <div className="w-1/2 text-indigo-600 text-right">
                  <strong className="text-xl">Badge:</strong> {kudo.badge}
                </div>
              </div>

              {/* Reason and ID section */}
              <div className="flex justify-between items-center text-lg text-gray-700 mt-2 space-x-4">
                <div className="w-1/2 text-green-600">
                  <strong className="text-lg">Reason:</strong> {kudo.reason}
                </div>
              </div>

              {/* User and Like section */}
              <div className="flex justify-between items-center text-lg mt-2 text-gray-800 space-x-4">
                <div className="w-1/2 text-right">
                  <div
                    onClick={() => handleClickLike(kudo._id)}
                    className="cursor-pointer mt-3 text-red-500 hover:text-red-600 text-xl transition-colors duration-300"
                  >
                    <button className="cursor-pointer mt-3 text-red-500 hover:text-red-600 hover:bg-red-800 text-xl transition-colors duration-300"></button>
                    💗
                  </div>
                </div>
              </div>

              <hr className="my-4 border-gray-200" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-xl text-center">No kudos available.</p>
      )}
    </div>
  );
};

export default KudosList;
