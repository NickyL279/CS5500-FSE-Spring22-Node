/**
 * @file Bookmark data model
 */
import User from '../users/User';
import Tuit from '../tuits/Tuit';

export default interface Bookmark {
  user: User;
  tuit: Tuit;
}
