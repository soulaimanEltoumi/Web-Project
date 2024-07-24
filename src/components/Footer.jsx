import React from "react";
import { FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const today = new Date();
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 p-4 text-gray-100">
      <div className="flex h-2 items-center justify-center gap-10">
        <p>&copy; {today.getFullYear()} All right reserved.</p>
        <Link to="/about">About Us</Link>

        <a
          href="https://github.com/soulaimanEltoumi/Web-Project"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithubSquare size={28} className="mr-4" />
        </a>
      </div>
    </footer>
  );
}
