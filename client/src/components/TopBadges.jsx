import React, { useState, useEffect } from "react";
import TopBadgesGraph from "./TopBadgesGraph";

function TopBadges() {
  const [topBadges, setTopBadges] = useState([]);

  useEffect(() => {
    const fetchTopBadges = async () => {
      try {
        const response = await fetch("/kudos/topbadges");
        const data = await response.json();
        setTopBadges(data.topBadges);
      } catch (error) {
        console.error("Error fetching top badges:", error);
      }
    };

    fetchTopBadges();
  }, []);

  return <TopBadgesGraph topBadges={topBadges} />;
}

export default TopBadges;
