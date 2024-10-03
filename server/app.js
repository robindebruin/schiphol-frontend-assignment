// This is would normally not be in a frontend repo, but for the sake of the simplicity it is here.

import express, { json } from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/flights", (req, res) => {
  const filePath = "server/flights.json";

  const { airport, limit = 5, order_by } = req.query;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }

    try {
      const jsonData = JSON.parse(data);
      const result = jsonData.flights.filter((flight) => {
        return flight.airport.toLowerCase().includes(airport.toLowerCase());
      });

      const limitedResult = result.slice(0, limit);

      setTimeout(() => {
        res.json({ flights: limitedResult });
        // timeout to simulate slow network and test loading state
      }, 1000);
    } catch (parseError) {
      res.status(500).json({ error: "Failed to parse JSON" });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
