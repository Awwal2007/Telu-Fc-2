// src/components/Clock.jsx
import { useEffect, useState } from "react";

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // updates every second

    return () => clearInterval(timer); // cleanup
  }, []);

  // Format options
  const dateOptions = {
    weekday: "long",   // e.g., Sunday
    year: "numeric",   // e.g., 2025
    month: "long",     // e.g., June
    day: "numeric",    // e.g., 20
  };

  const formattedDate = currentTime.toLocaleDateString("en-US", dateOptions);
  const formattedTime = currentTime.toLocaleTimeString("en-US");

  return (
    <div style={{color: 'white', display: "flex", gap: "10px"}} className="text-center p-4">
      <p id="date" style={{padding: "3px"}} className="text-xl font-medium">{formattedDate}</p>
      <p id="time" className="text-2xl font-bold mt-2">{formattedTime}</p>
    </div>
  );
}

export default Clock;
