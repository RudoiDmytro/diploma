import React from "react";

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div
      className={`items-center p-2 leading-5 ${
        isDanger ? "text-red-600" : ""
      }`}
    >
      <p className="m-0">{value}</p>
    </div>
  );
};

export default DateTimeDisplay;
