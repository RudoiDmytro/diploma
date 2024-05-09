import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={`flex flex-col items-center p-2 leading-5 ${isDanger ? 'text-red-600' : ''}`}>
      <p className="m-0">{value}</p>
      <span className="uppercase text-sm leading-4">{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
