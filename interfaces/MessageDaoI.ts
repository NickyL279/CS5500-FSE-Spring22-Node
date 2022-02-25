import Message from '../models/messages/Message';

export default interface MessageDaoI {
    userMessagesUser(
        senderUid: string,
        receiverUid: string,
        message: Message
    ): Promise<Message>;

    findAllSentMessages(uid: string): Promise<Message[]>;

    findAllReceivedMessages(uid: string): Promise<Message[]>;

    deleteMessage(mid: string): Promise<Message[]>;
}
