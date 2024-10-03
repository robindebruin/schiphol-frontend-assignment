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
    <div className="h-32 flex items-center max-w-[664px] m-auto">
      <input
        type="text"
        name="flightSearch"
        id="flightSearch"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-[--grey-storm] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-950 sm:text-sm sm:leading-6 h-12 bg-[--white]"
        placeholder="Search for arriving flights"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label="Search for arriving flights"
      />
    </div>
  );
};
