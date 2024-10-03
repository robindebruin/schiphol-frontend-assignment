import { useState } from "react";
import { FlightSearchInput } from "./FlightSearchInput";
import { FlightsList } from "./FlightsList";
import { FlightsSort } from "./FlightsSort";
import { Sort } from "./sortFlights";

export const Flights = () => {
  const [flightsQuery, setFlightsQuery] = useState("");
  const [sort, setSort] = useState<Sort>("asc");

  return (
    <div className="w-3/4 m-auto">
      <FlightSearchInput handleSearch={setFlightsQuery} />
      <div className="flex justify-end mb-4">
        <FlightsSort sort={sort} handleSort={setSort} />
      </div>
      {flightsQuery && <FlightsList query={flightsQuery} sort={sort} />}
    </div>
  );
};
