import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Flights } from "../data/types/flights";
import { FlightsList } from "./FlightsList";

const fetchFlights = (): Promise<Flights> =>
  // TODO: put the URL in a config file
  fetch("http://127.0.0.1:3000/flights").then((res) => res.json());

export const Overview = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["flightsData"],
    queryFn: fetchFlights,
  });

  const [search, setSearch] = React.useState("");
  const [filteredFlights, setFilteredFlights] = React.useState(
    data?.flights || []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearch(e.target.value);
    filterFlights(e.target.value);
    // TODO: use debounce
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // TODO: use to ignore debounce
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      setSearch(e.currentTarget.value);
      filterFlights(e.currentTarget.value);
    }
  };

  const filterFlights = (query: string) => {
    if (!data) return;
    if (query.length < 3) return;

    const result = data.flights.filter((flight) => {
      return flight.airport.toLowerCase().includes(query.toLowerCase());
    });

    const limitedResult = result.slice(0, 5);

    setFilteredFlights(limitedResult);
  };

  // TODO: use loading component
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <input type="text" onChange={handleChange} onKeyDown={handleKeyDown} />
      <div>{search}</div>
      <ul>
        <FlightsList flights={filteredFlights} />
      </ul>
    </div>
  );
};
