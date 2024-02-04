import { forwardRef, useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";

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
        console.log(data);
        setCities(data);
      };

      fetchData();
    }, [locationSearchInput]);

    return (
      <div className="relative">
        <Input
          placeholder="Search for a city"
          type="search"
          value={locationSearchInput}
          {...props}
          ref={ref}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        />
        {locationSearchInput.trim() && hasfocus && (
          <div className="absolute bg-background shadow-xl border-x border-b rounded-b-lg z-10 divide-y">
            {!cities.length && <p className="p-3">No results found</p>}
            {cities.map((city) => (
              <button
                key={city}
                className="block w-full text-start p-2"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setLocationSearchInput("");
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
