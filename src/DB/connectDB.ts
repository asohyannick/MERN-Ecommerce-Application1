import * as mongoDB from 'mongoDB';
import * as dotenv from 'dotenv';

export async function connectedToDB() {
 dotenv.config();
 const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_URI as string);
           
 await client.connect();
     
 const db: mongoDB.Db = client.db(process.env.DB_NAME);
    console.log(`Successfully connected to database: ${db.databaseName}...`);
}