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

    useMemo(() => {
      if (!locationSearchInput.trim()) return;

      const fetchData = async () => {
        const data = await fetch(`http://localhost:3000/api/cities`, {
          method: "POST",
          body: JSON.stringify(locationSearchInput),
        }).then((response) => response.json());
        console.log(data);
        setCities(data);
      }

      fetchData();
    }, [locationSearchInput]);

    return (
      <div>
        <Input
          value={locationSearchInput}
          {...props}
          ref={ref}
          onChange={(e) => setLocationSearchInput(e.target.value)}
        />
        <div>{JSON.stringify(cities)}</div>
      </div>
    );
  }
);
