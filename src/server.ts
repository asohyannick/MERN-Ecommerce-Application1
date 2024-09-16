import express, {Request, Response, Application, NextFunction} from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
const app:Application = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser());
app.use(cors());
app.use(helmet())
const port : number | string = process.env.PORT || 8000;
app.get('/testing', function(req:Request, res: Response, next: NextFunction) {
    res.send('API is working...');
})
app.listen(port, function() {
    console.log(`Server is running on port ${port}...`);
})