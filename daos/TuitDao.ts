<<<<<<< Updated upstream
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({postedBy: uid});
    }

    async findTuitById(tid: string): Promise<any> {
        return await TuitModel.findById(tid);
    }

    async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }

    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
=======
/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from '../mongoose/tuits/TuitModel';
import Tuit from '../models/tuits/Tuit';
import TuitDaoI from '../interfaces/TuitDaoI';

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance.
     * @returns {TuitDao} A DAO instance
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    };

    private constructor() {
    }

    /**
     * Uses TuitModel to retrieve all the tuits from "tuits" collection.
     * @returns {Promise} To be notified when the tuits are retrieved from the database
     */
    findAllTuits = async (): Promise<Tuit[]> => TuitModel.find();

    /**
     * Uses TuitModel to retrieve a tuit using its primary key.
     * @param {string} tid The primary key of a tuit
     * @returns {Promise} To be notified when the tuit is retrieved from the database
     */
    findAllTuitsByUser = async (tid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: tid});

    /**
     * Uses TuitModel to retrieve all the tuits of a user using the user's primary key.
     * @param {string} uid The user's primary key
     * @returns {Promise} To be notified when the tuits are retrieved from the database
     */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid).populate('postedBy').exec();

    /**
     * Inserts a new tuit instance to the database.
     * @param {User} uid The user id
     * @param {Tuit} tuit The tuit id
     * @returns {Promise} To be notified when the tuit is inserted
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    /**
     * Updates an existing tuit with new values in the database.
     * @param {string} tid The tuit's primary key
     * @param {Tuit} tuit A Tuit object containing properties and their new values
     * @returns {Promise} To be notified when the tuit is inserted into the database
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne({_id: tid}, {$set: tuit});

    /**
     * Deletes an existing tuit using its primary key.
     * @param {string} tid The tuit's primary key
     * @returns {Promise} To be notified when the tuit is deleted from the database
     */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id: tid});
>>>>>>> Stashed changes
}
