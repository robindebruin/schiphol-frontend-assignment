import { Flight } from "../data/types/flights";

type FlightSearchInputProps = {
  flights: Flight[];
  handleSearch: (flights: Flight[]) => void;
};

export const FlightSearchInput = ({
  flights,
  handleSearch,
}: FlightSearchInputProps) => {
  const filterFlights = (query: string) => {
    if (query.length < 3) {
      handleSearch([]);
      return;
    }

    const result = flights.filter((flight) => {
      return flight.airport.toLowerCase().includes(query.toLowerCase());
    });

    const limitedResult = result.slice(0, 5);
    handleSearch(limitedResult);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterFlights(e.target.value);
    // TODO: use debounce
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // TODO: use to ignore debounce
    if (e.key === "Enter") {
      filterFlights(e.currentTarget.value);
    }
  };

  return (
    // TODO: add clear button
    <input type="text" onChange={handleChange} onKeyDown={handleKeyDown} />
  );
};
