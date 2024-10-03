import dayjs from "dayjs";
import { Flight } from "../data/types/flights";

export type Sort = "asc" | "desc";

const createDate = (flight: Flight) =>
    dayjs(`${flight.date} ${flight.expectedTime}`);
  
export const sortFlights = (sort: Sort, flights: Flight[]) =>
  flights.sort((a, b) => {
    if (sort === "asc") {
      return createDate(a).isAfter(createDate(b)) ? 1 : -1;
    }
    return createDate(a).isAfter(createDate(b)) ? -1 : 1;
  });
  