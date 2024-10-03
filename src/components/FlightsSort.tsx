import dayjs from "dayjs";
import { useState } from "react";
import { Flight } from "../data/types/flights";

type Sort = "asc" | "desc";

type FlightsSortProps = {
  flights: Flight[];
  handleSort: (flights: Flight[]) => void;
};

const createDate = (flight: Flight) =>
  dayjs(`${flight.date} ${flight.expectedTime}`);

const sortFlights = (sort: Sort, flights: Flight[]) =>
  flights.sort((a, b) => {
    if (sort === "asc") {
      return createDate(a).isAfter(createDate(b)) ? 1 : -1;
    }
    return createDate(a).isAfter(createDate(b)) ? -1 : 1;
  });

export const FlightsSort = ({ flights, handleSort }: FlightsSortProps) => {
  const [sort, setSort] = useState<Sort>("asc");

  const handleOnClick = () => {
    setSort(sort === "asc" ? "desc" : "asc");

    handleSort(sortFlights(sort, flights));
  };

  return <button onClick={handleOnClick}>Sort {sort}</button>;
};
