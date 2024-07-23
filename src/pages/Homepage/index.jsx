import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function Homepage() {
  const navigate = useNavigate();

  const classes = {
    div: "your-div-class",
    button: "your-button-class",
  };

  const handleButtonClick = () => {
    navigate("/FoodList");
  };

  return (
    <div>
      <h1>Welcome to the home page</h1>
      <div>
        <button onClick={handleButtonClick}>all Recipes</button>
      </div>
    </div>
  );
}
