"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import DateTimeDisplay from "../DateTimeDisplay";
import { useCountdown } from "@/hooks/useCountdown";
import Styles from "./styles";

interface CountdownTimerProps {
  targetDate: number;
  onExpire: () => void;
}

interface ShowCounterProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ExpiredNotice = () => {
  return (
    <Box role="alert" sx={Styles.expired}>
      <Typography component="span" sx={Styles.expiredText}>
        Expired!!!
      </Typography>
    </Box>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }: ShowCounterProps) => {
  const t = useTranslations("A11y");
  // Danger once three minutes or fewer remain (and no days/hours left).
  const isDanger = days === 0 && hours === 0 && minutes <= 3;

  return (
    <Box
      role="timer"
      aria-label={t("time_remaining")}
      sx={isDanger ? [Styles.counter, Styles.counterDanger] : Styles.counter}
    >
      {days !== 0 && (
        <>
          <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
          <Typography component="span" aria-hidden="true" sx={Styles.separator}>
            :
          </Typography>
        </>
      )}

      {hours !== 0 && (
        <>
          <DateTimeDisplay value={hours} type={"Hours"} isDanger={hours <= 3} />
          <Typography component="span" aria-hidden="true" sx={Styles.separator}>
            :
          </Typography>
        </>
      )}

      <DateTimeDisplay value={minutes} type={"Mins"} isDanger={isDanger} />
      <Typography component="span" aria-hidden="true" sx={Styles.separator}>
        :
      </Typography>
      <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={isDanger} />
    </Box>
  );
};

const CountdownTimer = ({ targetDate, onExpire }: CountdownTimerProps) => {
  const t = useTranslations("A11y");
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  // Track the last whole minute announced so screen readers are not spammed
  // every second; we only announce when the minute value changes.
  const [announcement, setAnnouncement] = useState("");
  const lastAnnouncedMinute = useRef<number | null>(null);

  const isExpired = days + hours + minutes + seconds <= 0;
  const isDanger = days === 0 && hours === 0 && minutes <= 3;

  useEffect(() => {
    if (isExpired) {
      onExpire();
    }
  }, [days, hours, minutes, seconds, isExpired, onExpire]);

  useEffect(() => {
    if (isExpired) {
      return;
    }
    const totalMinutes = days * 24 * 60 + hours * 60 + minutes;
    if (lastAnnouncedMinute.current !== totalMinutes) {
      lastAnnouncedMinute.current = totalMinutes;
      setAnnouncement(t("minutes_remaining", { minutes: totalMinutes }));
    }
  }, [days, hours, minutes, isExpired, t]);

  if (isExpired) {
    return <ExpiredNotice />;
  }

  return (
    <Box>
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
      {isDanger && (
        <Typography component="p" sx={Styles.dangerLabel}>
          {t("countdown_danger")}
        </Typography>
      )}
      <Box
        aria-live="polite"
        aria-atomic="true"
        sx={Styles.visuallyHidden}
      >
        {announcement}
      </Box>
    </Box>
  );
};

export default CountdownTimer;
