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
      <div className="container mx-auto flex items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          MyLogo
        </Link>
        <div className="ml-auto flex items-center">
          <div className="relative ml-4">
            <div
              className="align-content: center, w-12 cursor-pointer"
              onClick={toggleMenu}
            >
              <GiHamburgerMenu />
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
