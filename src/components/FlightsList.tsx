import { queryOptions, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FlightsResponse } from "../data/types/flights";
import { Sort, sortFlights } from "./sortFlights";

type FlightsListProps = {
  query: string;
  sort: Sort;
};

const fetchFlights = (query: string): Promise<FlightsResponse> =>
  // TODO: put the URL in a config file
  fetch(
    "http://127.0.0.1:3000/flights?" +
      new URLSearchParams({
        airport: query,
        limit: "5",
        order_by: "date:desc", // ignored for time purposes
      })
  ).then((res) => res.json());

const fetchFlightsOptions = (query: string) => {
  return queryOptions({
    queryKey: ["flightsData", query],
    queryFn: () => fetchFlights(query),
  });
};

export const FlightsList = ({ query, sort }: FlightsListProps) => {
  const { isPending, error, data } = useQuery(fetchFlightsOptions(query));

  // TODO: make proper loading and error components
  if (isPending)
    return <div className="text-xl text-fuchsia-500">"Loading..."</div>;

  if (error)
    return (
      <div className="text-xl text-red-500">
        {`"An error has occurred: ${error.message}`}
      </div>
    );

  // TODO: add no results found vs no input
  if (query.length < 3) return;

  // TODO: add accessibility
  return (
    <ul aria-label="list of flights" role="list">
      {sortFlights(sort, data?.flights)?.map((flight) => (
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
