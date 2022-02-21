"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(app, userDao) {
        this.findAllUsers = (req, res) => this.userDao.findAllUsers()
            .then(users => res.json(users));
        this.findUserById = (req, res) => this.userDao.findUserById(req.params.uid)
            .then(user => res.json(user));
        this.createUser = (req, res) => this.userDao.createUser(req.body)
            .then(user => res.json(user));
        this.deleteUser = (req, res) => this.userDao.deleteUser(req.params.uid)
            .then(status => res.json(status));
        this.updateUser = (req, res) => this.userDao.updateUser(req.params.uid, req.body)
            .then(status => res.json(status));
        this.app = app;
        this.userDao = userDao;
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:uid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:uid', this.deleteUser);
        this.app.put('/users/:uid', this.updateUser);
    }
}
exports.default = UserController;
