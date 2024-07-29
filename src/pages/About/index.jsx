import React from "react";
import { useNavigate } from "react-router-dom";
import ImgMediaCard from "../../components/ImgMediaCard";

export default function About() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="flexbox">
        <div className="mx-20 my-8">
          <h1 className="my-10 text-center text-3xl font-bold">About us</h1>
          <p className="my-10">
            FINANCE S.M.M is a website dedicated to trading tracking. It offers
            users the ability to monitor the current market value and stay
            updated with the latest trading news. Users can easily register with
            a username and password. Once registered, they can create and manage
            their own list of favorite trades and edit their personal profile.
          </p>
        </div>
        <div className="flexbox">
          <h2 className="my-6 text-center text-2xl font-semibold">
            Meet the Team
          </h2>
          <div className="flex flex-row justify-evenly">
            <ImgMediaCard />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="w-30 m-12 h-8 rounded bg-blue-500 p-1 text-center text-white"
            onClick={handleClick}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
