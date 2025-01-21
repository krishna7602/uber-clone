import React from "react";

const LocationSearchPannel = ({
  suggestions, // expects an array of objects with a description property
  setPickup,
  setDestination,
  setPanelOpen,
  setVehiclePanelOpen,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion); 
    } else if (activeField === "destination") {
      setDestination(suggestion); 
    }
    // Uncomment these lines if necessary to close the panel or open the vehicle panel
    // setPanelOpen(false);
    // setVehiclePanelOpen(true);
  };

  console.log(suggestions);

  return (
    <div className="p-4">
      {Array.isArray(suggestions) && suggestions.length === 0 ? (
        <p className="text-gray-500">No suggestions available</p>
      ) : (
        Array.isArray(suggestions) &&
  suggestions.map((suggestion, idx) => (
    <div
      key={idx}
      onClick={() => handleSuggestionClick(suggestion)}
      className="flex gap-4 border-2 p-3 border-gray-50 hover:border-black rounded-xl items-center my-2 justify-start cursor-pointer"
    >
      <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
        <i className="ri-map-pin-fill"></i>
      </h2>
      <h4 className="font-medium">{suggestion}</h4>
    </div>
  ))
      )}
    </div>
  );
};

export default LocationSearchPannel;
