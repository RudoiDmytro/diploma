import React from "react";
import { Box, Typography } from "@mui/material";
import Styles from "./styles";

interface DateTimeDisplayProps {
  value: number;
  type: string;
  isDanger: boolean;
}

const DateTimeDisplay = ({ value, type, isDanger }: DateTimeDisplayProps) => {
  return (
    <Box sx={isDanger ? [Styles.unit, Styles.unitDanger] : Styles.unit}>
      <Typography component="p" sx={Styles.value} aria-hidden="true">
        {value}
      </Typography>
      <Typography component="span" sx={Styles.label} aria-hidden="true">
        {type}
      </Typography>
    </Box>
  );
};

export default DateTimeDisplay;
