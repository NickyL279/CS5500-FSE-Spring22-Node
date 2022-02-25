/**
 * @file Follow data model
 */
import User from '../users/User';

export default interface Follow {
  follower: User;
  followee: User;
}
