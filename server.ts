/**
 * @file Server file
 */
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tuiter')

app.get('/', (req: Request, res: Response) =>
  res.send('This is the root of the server')
);

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
