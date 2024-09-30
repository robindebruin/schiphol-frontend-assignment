// This is would normally not be in a frontend repo, but for the sake of the simplicity it is here.

import express from "express";
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

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }

    try {
      const jsonData = JSON.parse(data);
      setTimeout(() => {
        res.json(jsonData);
        // timeout to simulate slow network and test loading state
      }, 4000);
    } catch (parseError) {
      res.status(500).json({ error: "Failed to parse JSON" });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
