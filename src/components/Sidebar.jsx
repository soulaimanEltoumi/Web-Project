import React from "react";

const Sidebar = ({ isVisible }) => {
  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 ${
        isVisible ? "w-64" : "w-0"
      }`}
      style={{ overflow: "hidden" }}
    >
      <div className={`flex w-full flex-col ${isVisible ? "p-4" : "p-0"}`}>
        <input
          type="text"
          placeholder="Filter components..."
          className={`rounded-md p-2 text-black focus:outline-none ${isVisible ? "block" : "hidden"}`}
        />
        <div className={`mt-4 space-y-2 ${isVisible ? "block" : "hidden"}`}>
          <div>Component 1</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
