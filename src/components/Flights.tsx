import { useState } from "react";
import { Flight } from "../data/types/flights";
import { FlightSearchInput } from "./FlightSearchInput";
import { FlightsList } from "./FlightsList";
import { FlightsSort } from "./FlightsSort";
import { Sort, sortFlights } from "./sortFlights";

type FlightsProps = {
  flights: Flight[];
};

export const Flights = ({ flights }: FlightsProps) => {
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [sort, setSort] = useState<Sort>("asc");

  return (
    <div className="w-3/4 m-auto">
      <FlightSearchInput flights={flights} handleSearch={setFilteredFlights} />
      <div className="flex justify-end mb-4">
        <FlightsSort sort={sort} handleSort={setSort} />
      </div>
      <FlightsList flights={sortFlights(sort, filteredFlights)} />
    </div>
  );
};
