import express, { Application} from "express";
import "dotenv/config";
import morgan from 'morgan'
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
// Routes
// DB
import Database from "./Config/DB/Database";
import Logger from "./Config/Loggger/Logger";
import UserRoutes from './Routes/userRoutes/User.route';
import ErrorHandler from "./Middleware/Error.Middleware/Error.Middleware";
const userRoutes = new UserRoutes().getRoutes();
class App {
  public app: Application;
  public host: string | number;
  public port: string | number;
  public api_version: string | number;
  public env!: boolean;
  public db = new Database();
  public logStream = Logger.logStream;
  public logger = Logger.logger;
  public errorHandler = new ErrorHandler();

  constructor() {
    this.app = express();
    this.host = process.env.HOST || 'localhost';
    this.port = process.env.PORT || 8000;
    this.api_version = process.env.API_VERSION || 'v1';

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeDatabase();
    this.initializeErrorHandlers();
    this.startApp();
  }
  public initializeMiddlewares() : void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(morgan('combined', {stream: this.logStream}))
  }
  public initializeDatabase(): void {
    this.db.initializeDatabase();
  }
  public initializeRoutes(): void {
    this.app.use(`/api/${this.api_version}/users`, userRoutes);
    // Register routes here
  }
  public initializeErrorHandlers(): void {
    this.app.use(this.errorHandler.appErrorHandler);
    this.app.use(this.errorHandler.genericErrorHandler);
    this.app.use(this.errorHandler.notFound);
  }
  public startApp(): void {
    this.app.listen(this.port, () => {
      this.logger.info(
        `Server started at ${this.host} : runing on port ${this.port} and on API version /api/${this.api_version}/`
      );
    });
  }
  public getApp(): Application {
    return this.app;
  }
}

const app = new App();

export default app;

