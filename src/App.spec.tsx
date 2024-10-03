import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { afterEach, expect, test, vi } from "vitest";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { Flights } from "./components/Flights";

const data = {
  flights: [
    {
      flightIdentifier: "D20190401UA969",
      flightNumber: "UA 969",
      airport: "San Francisco",
      date: "2022-02-23",
      expectedTime: "14:50",
      originalTime: "14:50",
      url: "/en/departures/flight/D20190401UA969/",
      score: "70.55272",
    },
  ],
};

afterEach(() => {
  cleanup();
});

test("should render init state", () => {
  render(<App />);

  expect(screen.getByText("Find arriving flights")).toBeTruthy();
});

test("should fetch flights", async () => {
  render(<App />);

  const user = userEvent.setup();
  const input = screen.getByTestId("flight-search-input");

  await user.type(input, "Dub{Enter}");

  expect(screen.getByTestId("flight-list-loading")).toBeTruthy();
});

test("should show result of input after successful fetch", async () => {
  const mockFetch = vi.spyOn(global, "fetch").mockResolvedValue({
    ...new Response(),
    json: () => new Promise((resolve) => resolve(data)),
  });

  render(<App />);

  const user = userEvent.setup();
  const input = screen.getByTestId("flight-search-input");

  await user.type(input, "San{Enter}");

  await waitFor(() => {
    expect(screen.getByText("San Francisco")).toBeTruthy();
  });

  mockFetch.mockRestore();
});

test("should show error message on failed fetch", async () => {
  const mockFetch = vi
    .spyOn(global, "fetch")
    .mockRejectedValue(new Error("Network error"));

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <Flights />
    </QueryClientProvider>
  );

  const user = userEvent.setup();
  const input = screen.getByTestId("flight-search-input");

  await user.type(input, "San{Enter}");

  await waitFor(() => {
    expect(
      screen.getByText("An error has occurred: Network error")
    ).toBeTruthy();
  }, {});

  mockFetch.mockRestore();
});

test("should show an empty list when no results are found", async () => {
  const mockFetch = vi.spyOn(global, "fetch").mockResolvedValue({
    ...new Response(),
    json: () => new Promise((resolve) => resolve({ flights: [] })),
  });

  render(<App />);

  const user = userEvent.setup();
  const input = screen.getByTestId("flight-search-input");

  await user.type(input, "San{Enter}");

  await waitFor(() => {
    const list = screen.getByTestId("list-of-flights");
    // for now we are just checking if the list is empty
    expect(list.children.length).toBe(0);
  });

  mockFetch.mockRestore();
});
