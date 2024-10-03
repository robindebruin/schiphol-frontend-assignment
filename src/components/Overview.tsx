import { useQuery } from "@tanstack/react-query";
import { FlightsResponse } from "../data/types/flights";
import { Flights } from "./Flights";

const fetchFlights = (): Promise<FlightsResponse> =>
  // TODO: put the URL in a config file
  fetch("http://127.0.0.1:3000/flights").then((res) => res.json());

export const Overview = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["flightsData"],
    queryFn: fetchFlights,
  });

  // TODO: use loading component
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <Flights flights={data.flights} />;
};
