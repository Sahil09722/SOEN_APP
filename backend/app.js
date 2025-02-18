import express from 'express';
import morgan from 'morgan';
import connect from './Db/db.js';

connect();//connecting to database using the function from db.js

const app = express();

app.use(express.json());// for parsing application/json 
app.use(express.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(morgan('dev'));//for logging requests

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;