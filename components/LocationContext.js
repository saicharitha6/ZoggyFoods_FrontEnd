// LocationContext.js

import React, { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState("");

  const updateLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <LocationContext.Provider value={{ selectedLocation, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
