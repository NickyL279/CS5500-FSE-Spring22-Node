"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
mongoose_1.default.connect('mongodb://localhost:27017/tuiter');
app.use(body_parser_1.default.json());
app.get('/hello', (req, res) => res.send('Hello World!'));
const userDao = new UserDao_1.default();
const tuitDao = new TuitDao_1.default();
const userController = new UserController_1.default(app, userDao);
const tuitController = new TuitController_1.default(app, tuitDao);
const PORT = 4000;
app.listen(process.env.PORT || PORT);
