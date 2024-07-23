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
      <div className="flex flex-row justify-evenly">
        <ImgMediaCard />
      </div>
      <div className="flex justify-center">
        <button
          className="w-30 m-5 h-8 rounded bg-blue-500 p-1 text-center"
          onClick={handleClick}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
