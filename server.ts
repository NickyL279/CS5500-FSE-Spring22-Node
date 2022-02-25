import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";

dotenv.config();
const app = express();
app.use(express.json());

//mongodb+srv://<username>:<password>@cluster0.ywwle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "nickyl279";
const DB_PASSWORD = "QZ3PZFfSpe77aJXy";
const HOST = "cluster0.ywwle.mongodb.net";
const DB_NAME = "myFirstDatabase";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
mongoose.connect(connectionString);

//mongoose.connect('mongodb://localhost:27017/tuiter')

app.get('/', (req: Request, res: Response) =>
  res.send('Hello World!')
);

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
