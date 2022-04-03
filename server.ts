/**
 * @file Implements an Express Node HTTP server. Declares RESTful web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 *     <li>follows</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database service.
 */
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import dotenv, {config} from 'dotenv';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from "./controllers/auth-controller";

const cors = require('cors');
const session = require("express-session");
require('dotenv').config();

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

const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.CORS_ORIGIN,
        // origin: "http://localhost:3000"
    })
);

let sess = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
    },
};

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}

app.use(session(sess))
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Hello World!')
);

// const userController = UserController.getInstance(app);
// const tuitController = TuitController.getInstance(app);
// const likeController = LikeController.getInstance(app);
// const followController = FollowController.getInstance(app);
// const bookmarkController = BookmarkController.getInstance(app);
// const messageController = MessageController.getInstance(app);

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
//const likesController = LikeController.getInstance(app);
//const dislikeController = DislikeController.getInstance(app);

//SessionController(app);
AuthenticationController(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
