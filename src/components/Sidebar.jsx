import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const collapsedState = localStorage.getItem("sidebar-collapsed");
    if (collapsedState !== null) {
      setIsCollapsed(JSON.parse(collapsedState));
    }
  }, []);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem(
      "sidebar-collapsed",
      JSON.stringify(newCollapsedState),
    );
  };

  return (
    <div
      className={`flex ${isCollapsed ? "w-16" : "w-64"} h-screen bg-gray-900 text-white transition-all duration-300`}
    >
      <div className="flex w-full flex-col">
        <button
          onClick={toggleSidebar}
          className="bg-gray-700 p-4 transition-colors duration-300 hover:bg-gray-600 focus:outline-none"
        >
          {isCollapsed ? ">" : "<"}
        </button>
        <div
          className={`flex flex-col space-y-4 p-4 ${isCollapsed ? "hidden" : "block"}`}
        >
          <input
            type="text"
            placeholder="Filter components..."
            className="rounded-md p-2 text-black focus:outline-none"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <div className="mt-4 space-y-2">
            {/* Muestra componentes filtrados basados en filterText */}
            {/* Ejemplo de componentes a filtrar */}
            <div
              className={`${filterText === "" || "Component 1".toLowerCase().includes(filterText.toLowerCase()) ? "" : "hidden"}`}
            ></div>
            {/* Agrega más componentes según sea necesario */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
