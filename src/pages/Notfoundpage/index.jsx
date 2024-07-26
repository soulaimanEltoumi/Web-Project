import React from "react";

function notfoundpage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
      <p className="mt-2 text-gray-500">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
      >
        Go Home
      </a>
    </div>
  );
}

export default notfoundpage;
