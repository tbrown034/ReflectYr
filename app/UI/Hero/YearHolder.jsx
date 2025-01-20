import YearPicker from "../components/YearPicker";
import React from "react";

const YearHolder = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 bg-gray-800 rounded-lg shadow-md">
      {/* Title */}
      <h1 className="text-2xl font-extrabold text-gray-100">
        Select Your Year
      </h1>

      {/* Description */}
      <p className="max-w-lg text-sm text-center text-gray-400">
        Want to make your top ten list for this, last year or whenever? Choose a
        year below to get started!
      </p>

      {/* Year Picker */}
      <div className="flex justify-center w-full">
        <YearPicker />
      </div>
    </div>
  );
};

export default YearHolder;
