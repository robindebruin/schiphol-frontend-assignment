import { Sort } from "./sortFlights";

type FlightsSortProps = {
  sort: Sort;
  handleSort: (sort: Sort) => void;
};

export const FlightsSort = ({ sort, handleSort }: FlightsSortProps) => {
  const handleOnClick = () => {
    handleSort(sort === "asc" ? "desc" : "asc");
  };

  return <button onClick={handleOnClick}>Sort {sort}</button>;
};
