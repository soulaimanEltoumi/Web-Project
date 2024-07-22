import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          MyLogo
        </Link>
        <div className="ml-auto flex items-center">
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
          <div className="relative ml-4">
            <div className="h-12 w-12 cursor-pointer" onClick={toggleMenu}>
              <img
                className="md:ml-4 md:mt-0"
                src="https://thumbs.dreamstime.com/z/icono-de-men%C3%BA-web-s%C3%ADmbolo-del-hamburguesa-vector-279634421.jpg?w=768"
                alt="Icono de lista"
              />
            </div>
            {menuVisible && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Log In
                </Link>
                <Link
                  to="/favorites"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Favourites
                </Link>
              </div>
            )}
          </div>
        </div>
        <div
          className={`md:flex ${isOpen ? "flex" : "hidden"} flex-col md:flex-row`}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
