import Like from '../models/likes/Like';

export default interface LikeDaoI {
    userLikesTuit(tid: string, uid: string): Promise<Like>;

    userUnlikesTuit(tid: string, uid: string): Promise<any>;

    findAllTuitsLikedByUser(uid: string): Promise<Like[]>;

    findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
}
