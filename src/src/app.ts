import express from "express";
import cors from "cors";
import api from "./routes/api.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => res.json({ message: "Culture Quiz API", status: "OK" }));
app.use("/api", api);
export default app;
