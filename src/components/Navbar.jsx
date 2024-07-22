import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          MiLogo
        </Link>
        <button
          className="text-white focus:outline-none md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div className={`md:flex ${isOpen ? "block" : "hidden"}`}>
          <Link
            to="/login"
            className="mr-4 mt-4 block text-white md:mt-0 md:inline-block"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/favorites"
            className="mt-4 block text-white md:mt-0 md:inline-block"
          >
            Favoritos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
