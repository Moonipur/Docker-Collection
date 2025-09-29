import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRoutes from "./routes/generate";
import decodeRoutes from "./routes/decode";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) =>
  res.json({ status: "ok", message: "barcode api running" })
);

app.use("/api", generateRoutes);
app.use("/api", decodeRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
