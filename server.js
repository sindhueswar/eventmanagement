import express from "express";
import mongoose from "mongoose";
import { eventsRoutes } from "./routes/eventsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";

import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.json());

app.use("/api/events", eventsRoutes);
app.use("/api/users", usersRoutes);


app.use(express.static(path.join(__dirname, "/client/dist")));


app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);


mongoose
  .connect(process.env.DB_URI, { dbName: "eventmanager" })
  .then(() => {
    console.log("connected to DB successfully");

    app.listen(4000, () => console.log("Listening to port 4000"));
  })
  .catch((err) => console.log(err));
