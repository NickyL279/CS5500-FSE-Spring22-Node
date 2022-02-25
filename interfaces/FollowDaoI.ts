import Follow from '../models/follows/Follow';

export default interface FollowDaoI {
    userFollowsUser(followerUid: string, followeeUid: string): Promise<Follow>;

    userUnfollowsUser(followerUid: string, followeeUid: string): Promise<any>;

    findAllUsersFollowers(uid: string): Promise<Follow[]>;

    findAllUsersFollowees(uid: string): Promise<Follow[]>;
}
