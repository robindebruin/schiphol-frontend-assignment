import dayjs from "dayjs";
import { useState } from "react";
import { Flight } from "../data/types/flights";
import { FlightListItem } from "./FlightListItem";

type FlightsListProps = {
  flights: Flight[];
};

type Sort = "asc" | "desc";

const createDate = (flight: Flight) =>
  dayjs(`${flight.date} ${flight.expectedTime}`);

export const FlightsList = ({ flights }: FlightsListProps) => {
  const [sort, setSort] = useState<Sort>("asc");

  const handleSort = () => setSort(sort === "asc" ? "desc" : "asc");

  const sortedFlights = flights.sort((a, b) => {
    if (sort === "asc") {
      return createDate(a).isAfter(createDate(b)) ? 1 : -1;
    }
    return createDate(a).isAfter(createDate(b)) ? -1 : 1;
  });

  return (
    <div>
      <button onClick={handleSort}>Sort {sort}</button>
      <ul>
        {sortedFlights.map((flight) => (
          <FlightListItem key={flight.flightIdentifier} flight={flight} />
        ))}
      </ul>
    </div>
  );
};
