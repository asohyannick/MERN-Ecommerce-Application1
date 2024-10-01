import express, { Application, Request, Response} from "express";
import "dotenv/config";
import morgan from 'morgan'
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
// DB
import Database from "./Config/DB/Database";
import Logger from "./Config/Loggger/Logger";
// Routes
import authRoute from './Routes/userRoutes/User.route'
import {notFound, appErrorHandler, genericErrorHandler} from "./Middleware/Error.Middleware/Error.Middleware";
const app:Application = express();
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port:number = Number(process.env.APP_PORT) || 8000;
const host: string | number = process.env.APP_HOST || 'localhost';
const api_version: string | number = process.env.API_VERSION || '/api/v1/';
app.use(`${api_version}`, authRoute);
app.use(notFound);
app.use(appErrorHandler);
app.use(genericErrorHandler);
async function runApp() {
  try {
    const database = new Database();
    await database.initializeDatabase();
    app.listen(port, function() {
      console.log(`Server is running on ${host}${api_version}...`)
    })
  } catch (error) {
    console.error(error)
  }
}
runApp();