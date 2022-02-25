<<<<<<< Updated upstream
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
=======
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
>>>>>>> Stashed changes

const app = express();

<<<<<<< Updated upstream
mongoose.connect('mongodb://localhost:27017/tuiter')
app.use(bodyParser.json())
=======
//mongodb+srv://<username>:<password>@cluster0.ywwle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "nickyl279";
const DB_PASSWORD = "QZ3PZFfSpe77aJXy";
const HOST = "cluster0.ywwle.mongodb.net";
const DB_NAME = "myFirstDatabase";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
mongoose.connect(connectionString);
>>>>>>> Stashed changes

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

<<<<<<< Updated upstream
const userDao = new UserDao();
const tuitDao = new TuitDao();
const userController = new UserController(app, userDao);
const tuitController = new TuitController(app, tuitDao);
=======
app.get('/', (req: Request, res: Response) =>
  res.send('Hello World!')
);

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
>>>>>>> Stashed changes

const PORT = 4000;
app.listen(process.env.PORT || PORT);