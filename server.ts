// import express, {Request, Response} from 'express';
// const app = express();
//
// app.get('/hello', (req: Request, res: Response) =>
//     res.send('Hello World!'));
//
// app.get('/add/:a/:b', (req: Request, res: Response) =>
//     res.send(req.params.a + req.params.b));
//
// const PORT = 4000;
// app.listen(process.env.PORT || PORT);
import express, {Request, Response} from 'express';
import UserController from './controllers/UserController';
import TuitController from "./controllers/TuitController";
import UserDao from './daos/UserDao';
import TuitDao from './daos/TuitDao';
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

mongoose.connect('mongodb://localhost:27017/tuiter')
app.use(bodyParser.json())

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

const userDao = new UserDao();
const tuitDao = new TuitDao();
const userController = new UserController(app, userDao);
const tuitController = new TuitController(app, tuitDao);

const PORT = 4000;
app.listen(process.env.PORT || PORT);