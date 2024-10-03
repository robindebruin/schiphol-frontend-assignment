import { Flight } from "../data/types/flights";

type FlightListItemProps = {
  flight: Flight;
};

export const FlightListItem = ({ flight }: FlightListItemProps) => {
  return (
    <li key={flight.flightIdentifier}>
      {flight.airport} {flight.date} {flight.expectedTime}
    </li>
  );
};
