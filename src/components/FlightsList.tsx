import dayjs from "dayjs";
import { Flight } from "../data/types/flights";

type FlightsListProps = {
  flights: Flight[];
};

export const FlightsList = ({ flights }: FlightsListProps) => {
  // TODO: add accessibility
  return (
    <ul aria-label="list of flights" role="list">
      {flights.map((flight) => (
        <li
          key={flight.flightIdentifier}
          className="flex justify-center mb-2 w-full items-center h-14 bg-white border border-gray-200 rounded-md shadow text-[color:--grey-storm] px-2"
          role="listitem"
          aria-label={`Flight from ${flight.airport}, scheduled on ${dayjs(
            flight.date
          ).format("DD-MM-YYYY")} at ${flight.expectedTime}`}
        >
          <div className="w-1/3 flex text-lg"> {flight.airport}</div>
          <div className="w-1/3">{dayjs(flight.date).format("DD-MM-YYYY")}</div>
          <div className="w-1/3 flex justify-end">{flight.expectedTime}</div>
        </li>
      ))}
    </ul>
  );
};
