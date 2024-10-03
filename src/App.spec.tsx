import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import App from "./App";

afterEach(() => {
  cleanup();
});

test("should render init state", () => {
  render(<App />);

  expect(screen.getByText("Find arriving flights")).toBeTruthy();
});
