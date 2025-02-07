"use client";

import { createContext, useContext, useState } from "react";

const YearContext = createContext();

export const YearProvider = ({ children }) => {
  // Set default year to 2025
  const [selectedYear, setSelectedYear] = useState(2025);
  return (
    <YearContext.Provider value={{ selectedYear, setSelectedYear }}>
      {children}
    </YearContext.Provider>
  );
};

export const useYear = () => useContext(YearContext);
