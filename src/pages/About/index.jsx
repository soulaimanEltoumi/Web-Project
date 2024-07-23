import React from "react";
import { useNavigate } from "react-router-dom";
import ImgMediaCard from "../../components/ImgMediaCard";
import MediaCard from "../../components/MediaCard";

export default function About() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      <ImgMediaCard />

      <button
        className="w-30 mb-5 h-8 rounded bg-blue-500 p-1"
        onClick={handleClick}
      >
        Go to Homepage
      </button>
    </div>
  );
}
