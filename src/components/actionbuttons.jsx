import React from "react";

const ActionButtons = ({ isFavourite, onFavouriteToggle }) => {
  return (
    <div className="flex space-x-4">
      <button
        className={`rounded px-4 py-2 ${isFavourite ? "cursor-not-allowed bg-gray-400" : "bg-blue-500 hover:bg-blue-700"}`}
        onClick={onFavouriteToggle}
        disabled={isFavourite}
      >
        {isFavourite ? "Favourited" : "Add to Favourite"}
      </button>
      {/* Otros botones con lógica similar */}
    </div>
  );
};

export default ActionButtons;
