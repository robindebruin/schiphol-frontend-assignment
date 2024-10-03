import debounce from "debounce";

type FlightSearchInputProps = {
  handleSearch: (query: string) => void;
};

export const FlightSearchInput = ({ handleSearch }: FlightSearchInputProps) => {
  const filterFlights = (query: string) => {
    if (query.length < 3) {
      handleSearch("");
      return;
    }
    handleSearch(query);
  };

  const filterFlightsDebounce = debounce(filterFlights, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterFlightsDebounce(e.target.value);
    // TODO: clear api calls which are still pending
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // ignore debounce and search immediately
      filterFlightsDebounce(e.currentTarget.value);
      filterFlightsDebounce.trigger();
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
