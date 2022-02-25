import Bookmark from '../models/bookmarks/Bookmark';

export default interface BookmarkDaoI {
    userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;

    userUnbookmarksTuit(uid: string, tid: string): Promise<any>;

    findAllUsersBookmarks(uid: string): Promise<Bookmark[]>;
}
