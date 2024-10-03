import { useState } from "react";
import { FlightList } from "./FlightList";
import { FlightSearchInput } from "./FlightSearchInput";
import { FlightSort } from "./FlightSort";
import { Sort } from "./flightsSort";

export const Flights = () => {
  const [flightsQuery, setFlightsQuery] = useState("");
  const [sort, setSort] = useState<Sort>("asc");

  return (
    <div className="w-3/4 m-auto">
      <FlightSearchInput handleSearch={setFlightsQuery} />

      {flightsQuery && (
        <>
          <div className="flex justify-end mb-4">
            <FlightSort sort={sort} handleSort={setSort} />
          </div>
          <FlightList query={flightsQuery} sort={sort} />
        </>
      )}
    </div>
  );
};
