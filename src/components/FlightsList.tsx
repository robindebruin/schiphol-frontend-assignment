import { Flight } from "../data/types/flights";
import { FlightListItem } from "./FlightListItem";

type FlightsListProps = {
  flights: Flight[];
};

export const FlightsList = ({ flights }: FlightsListProps) => {
  return (
    <>
      <ul>
        {flights.map((flight) => (
          <FlightListItem key={flight.flightIdentifier} flight={flight} />
        ))}
      </ul>
    </>
  );
};
