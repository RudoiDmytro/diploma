"use client"

import React, { useEffect } from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "@/components/hooks/useCountdown";

const ExpiredNotice = () => {
  return (
    <div className="text-center p-8 border border-solid border-gray-300 rounded m-2">
      <span className="font-bold text-5xl text-red-500">Expired!!!</span>
      <p className="text-2xl">Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="p-2 flex flex-row items-center space-x-2 border border-solid border-gray-300 w-fit">
      {days !== 0 && (
        <>
          <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
          <p>:</p>
        </>
      )}

      {hours !== 0 && (
        <>
          <DateTimeDisplay value={hours} type={"Hours"} isDanger={hours <= 3} />
          <p>:</p>
        </>
      )}

      {minutes && (
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={minutes <= 3} />
      )}
      <p>:</p>
      {seconds && (
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={minutes <= 3} />
      )}
    </div>
  );
};

const CountdownTimer = ({ targetDate, onExpire }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  // Call the onExpire callback when the timer expires
  useEffect(() => {
    if (days + hours + minutes + seconds <= 0) {
      onExpire();
    }
  }, [days, hours, minutes, seconds, onExpire]);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
