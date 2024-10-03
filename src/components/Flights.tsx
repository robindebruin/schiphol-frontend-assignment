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
    <>
      <FlightSearchInput flights={flights} handleSearch={setFilteredFlights} />
      <FlightsSort sort={sort} handleSort={setSort} />
      <FlightsList flights={sortFlights(sort, filteredFlights)} />
    </>
  );
};
