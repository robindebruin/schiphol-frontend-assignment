import { queryOptions, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FlightsResponse } from "../data/types/flights";
import { Sort, sortFlights } from "./flightsSort";

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

export const FlightList = ({ query, sort }: FlightsListProps) => {
  const { isPending, error, data } = useQuery(fetchFlightsOptions(query));

  // TODO: make proper loading and error components
  if (isPending)
    return (
      <div
        className="text-xl text-fuchsia-500"
        data-testid="flight-list-loading"
      >
        "Loading..."
      </div>
    );

  if (error)
    return (
      <div className="text-xl text-red-500" data-testid="flight-list-error">
        {`An error has occurred: ${error.message}`}
      </div>
    );

  // TODO: add no results found vs no input
  if (query.length < 3) return;

  return (
    <ul aria-label="list of flights" role="list" data-testid="list-of-flights">
      {sortFlights(sort, data?.flights)?.map((flight) => (
        <li
          key={flight.flightIdentifier}
          className="flex justify-between mb-2 w-full items-center h-14 bg-white border border-gray-200 rounded-md shadow text-[color:--grey-storm] px-2"
        >
          <dl className="pr-1 w-1/12" aria-label="Date">
            <dt className="sr-only">Date</dt>
            <dd>
              <span className="text-sm font-bold">
                {dayjs(flight.date).format("DD-MM")}
              </span>
            </dd>
            <dd>
              <span className="text-zinc-600">
                {dayjs(flight.date).format("YYYY")}
              </span>
            </dd>
          </dl>

          <dl aria-label="Airport and flight number" className=" w-1/3">
            <dt className="sr-only">Airport</dt>
            <dd>
              <div className="inline-flex gap-0.5">
                <span className="text-lg font-bold">{flight.airport}</span>
              </div>
            </dd>

            <dt className="sr-only">Flight number</dt>
            <dd>
              <span className="text-text-s text-color-neutral-50">
                {flight.flightNumber}
              </span>
            </dd>
          </dl>

          <dl
            className="pr-1  w-1/3 flex justify-end"
            aria-label="Flight times"
          >
            <span>
              {flight.originalTime !== flight.expectedTime && (
                <>
                  <dt className="sr-only">Original time</dt>
                  <dd>
                    <del>{flight.originalTime}</del>
                  </dd>
                </>
              )}

              <dt className="sr-only">Expected time</dt>
              <dd>
                <ins className="relative font-bold no-underline decoration-0 text-color-brand-50 group-hover/entry:text-color-brand-150 group-focus-visible/entry:text-color-brand-150">
                  {flight.expectedTime}
                </ins>
              </dd>
            </span>
          </dl>
        </li>
      ))}
    </ul>
  );
};
