import 'dotenv/config'
import express from 'express'
import apiRoutes from "./routes/index.js"
import { PORT,MONGO_URL } from './config.js'
import cors from 'cors';
import { connectToMongo } from './db/mongo.db.js'
import {jwtValiodation} from './middlewares/expressJwt.js'
const app = express();


// Middleware to parse JSON data
app.use(express.json());
app.use(cors('*'));
// Middleware to parse form data (urlencoded)
app.use(express.urlencoded({ extended: true }));

app.use(jwtValiodation())
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    console.log("Server is running");
    connectToMongo();
    res.status(200).send(`you are on ${PORT}`);
})


app.listen(PORT, '0.0.0.0', () => {
    console.log(` app listening on port ${PORT}`);
})