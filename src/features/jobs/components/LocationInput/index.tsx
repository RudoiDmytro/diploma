import { forwardRef, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Styles from "./styles";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [cities, setCities] = useState([]);
    const [hasfocus, setHasFocus] = useState(false);

    useMemo(() => {
      if (!locationSearchInput.trim()) return;

      const fetchData = async () => {
        const data = await fetch(`/api/cities`, {
          method: "POST",
          body: JSON.stringify(locationSearchInput),
        }).then((response) => response.json());
        setCities(data);
      };

      fetchData();
    }, [locationSearchInput]);

    return (
      <Box sx={Styles.wrapper}>
        <TextField
          label="Search for a city"
          type="search"
          fullWidth
          size="small"
          value={locationSearchInput}
          slotProps={{ htmlInput: props }}
          inputRef={ref}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        />
        {locationSearchInput.trim() && hasfocus && (
          <Box sx={Styles.results}>
            {!cities.length && (
              <Typography component="p" sx={Styles.noResults}>
                No results found
              </Typography>
            )}
            {cities.map((city) => (
              <Box
                component="button"
                type="button"
                key={city}
                sx={Styles.option}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setLocationSearchInput("");
                }}
              >
                {city}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    );
  }
);
