import express, { Request, Response, Application, NextFunction } from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
// DB
import { connectedToDB } from "./DB/connectDB";
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(helmet());
const port: number | string = process.env.PORT || 8000;
app.get("/testing", function (req: Request, res: Response, next: NextFunction) {
  res.send("API is working...");
});
// DB connected successfully;
async function runServer() {
  try {
    await connectedToDB();
    app.listen(port, function () {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.error(
      `There's an error: ${error instanceof Error ? error.message : error}`
    );
  }
}

runServer();
