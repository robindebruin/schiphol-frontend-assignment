import { useQuery } from "@tanstack/react-query";
import { Flights } from "../data/types/flights";

const fetchFlights = (): Promise<Flights> =>
  // TODO: put the URL in a config file
  fetch("http://127.0.0.1:3000/flights").then((res) => res.json());

export const Overview = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["flightsData"],
    queryFn: fetchFlights,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <ul>
        {data?.flights.map((flight) => (
          <li key={flight.flightIdentifier}>{flight.flightNumber}</li>
        ))}
      </ul>
    </div>
  );
};
