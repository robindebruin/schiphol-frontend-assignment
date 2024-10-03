import arrowUp from "./../assets/arrow_up.svg";

import { Sort } from "./sortFlights";

type FlightsSortProps = {
  sort: Sort;
  handleSort: (sort: Sort) => void;
};

export const FlightsSort = ({ sort, handleSort }: FlightsSortProps) => {
  const handleOnClick = () => {
    handleSort(sort === "asc" ? "desc" : "asc");
  };

  return (
    <button onClick={handleOnClick} className="text-[--evening-pink] flex">
      sort on date and time
      <img
        src={arrowUp}
        alt={`arrow ${sort === "asc" ? "up" : "down"}`}
        className={`transform ${sort === "asc" ? "rotate-180" : ""} `}
      />
    </button>
  );
};
