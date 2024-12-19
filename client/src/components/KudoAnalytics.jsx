import React, { useEffect, useState } from "react";
import TopBadges from "./TopBadges";

const KudoAnalytics = () => {
  const [topKudosPerson, setTopKudosPerson] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopKudos = async () => {
      try {
        const response = await fetch("/kudos/topkudoperson"); // Adjust the URL to your backend endpoint
        const data = await response.json();

        if (response.ok) {
          setTopKudosPerson(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("An error occurred");
      }
    };

    fetchTopKudos();
  }, []);

  return (
    <>
      <div className="flex justify-center p-9 m-9">
        <TopBadges />
        <div className="p-6 bg-gray-50 ">
          {error && (
            <p className="text-red-500 text-xl font-semibold mb-4">{error}</p>
          )}

          <div className="overflow-x-auto max-w-3xl mx-auto">
            {" "}
            {/* Adjust max width here */}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gradient-to-r from-indigo-500 to-green-500">
                <tr>
                  <th className="py-3 px-6 text-left text-xl font-semibold text-white">
                    Name
                  </th>
                  <th className="py-3 px-6 text-left text-xl font-semibold text-white">
                    Kudos Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {topKudosPerson &&
                  topKudosPerson.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 transition-colors duration-300"
                    >
                      <td className="py-4 px-6 text-lg text-gray-700">
                        {item.topPerson}
                      </td>
                      <td className="py-4 px-6 text-lg text-gray-700">
                        {item.kudosCount}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default KudoAnalytics;
