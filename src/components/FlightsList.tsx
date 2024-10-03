import { useState } from "react";
import { Flight } from "../data/types/flights";
import { FlightListItem } from "./FlightListItem";
import { FlightsSort } from "./FlightsSort";

type FlightsListProps = {
  flights: Flight[];
};

export const FlightsList = ({ flights }: FlightsListProps) => {
  const [sortedFlights, setSortedFlights] = useState<Flight[]>(flights);

  return (
    <>
      <FlightsSort flights={flights} handleSort={setSortedFlights} />
      <ul>
        {sortedFlights.map((flight) => (
          <FlightListItem key={flight.flightIdentifier} flight={flight} />
        ))}
      </ul>
    </>
  );
};
