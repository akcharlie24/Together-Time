import dotenv from "dotenv";
import express, { Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/v1";

dotenv.config();

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 8080;

app.use(express.json());

app.use(
  cors({
    // TODO: change while productionising
    origin: process.env.FRONTEND_URL,
    credentials: true,
    // methods
    // allowedHeaders
  }),
);

// TODO: can add signed cookies later on
app.use(cookieParser());

app.get("/", (_req, res: Response) => {
  res.status(200).json({ message: "hello there" });
});

app.use("/api", routes);

app.listen(HTTP_PORT, () =>
  console.log(`Server Started Listening on ${HTTP_PORT}`),
);
