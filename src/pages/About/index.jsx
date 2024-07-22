import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>About Us Page</h1>
      <button onClick={handleClick}>Go to Homepage</button>
    </div>
  );
}
