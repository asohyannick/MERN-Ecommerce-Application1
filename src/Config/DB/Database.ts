import * as mongoDB from "mongoDB";
import * as dotenv from "dotenv";
import Logger from "../Loggger/Logger";
class Database {
  private DATABASE: string | undefined;
  private logger;

  constructor() {
    dotenv.config();
    // Replace database value in the .env file with your database config url
    this.DATABASE =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : process.env.DB_NAME;
    this.logger = Logger.logger;
  }

  public initializeDatabase = async (): Promise<void> => {
    try {
      const client: mongoDB.MongoClient = new mongoDB.MongoClient(
        process.env.MONGO_URI as string
      );
  
      await client.connect();
  
      const db: mongoDB.Db = client.db(process.env.DB_NAME);
      console.log(`Successfully connected to database: ${db.databaseName}...`);
    } catch (error) {
     this.logger.error("Database connection error:", error); 
    }
}
}
export default Database;
