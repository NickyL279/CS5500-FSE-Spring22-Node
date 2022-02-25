/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from 'express';
import MessageDao from '../daos/MessageDao';
import MessageControllerI from '../interfaces/MessageControllerI';
import Message from '../models/messages/Message';

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST api/messages/senders/:senderUid/receivers/:receiverUid to create a new message instance for
 *     the communication between two users</li>
 *     <li>GET api/messages/senders/:uid/receivers to retrieve a list of messages a
 *     specified user have sent</li>
 *     <li>GET api/messages/receivers/:uid/senders to retrieve a list of messages sent to
 *     a specified user</li>
 *     <li>DELETE api/messages/senders/:senderUid/receivers/:receiverUid to remove a particular message instance
 *     specified by sender and receiver userId</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
  private static messageDao = MessageDao.getInstance();
  private static messageController: MessageController | null = null;

  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @returns UserController
   */
  public static getInstance = (app: Express): MessageController => {
    if (MessageController.messageController === null) {
      MessageController.messageController = new MessageController();

      app.post('/api/users/:senderUid/messages/:receiverUid', MessageController.messageController.sendMessage);
      app.get('/api/users/:uid/messages/sent', MessageController.messageController.findAllSentMessages);
      app.get('/api/users/:uid/messages/received', MessageController.messageController.findAllReceivedMessages);
      app.delete('/api/messages/:mid', MessageController.messageController.deleteMessage);
    }
    return MessageController.messageController;
  };

  /**
   * User sends message to other user
   * @param {Request} req Represents request from client, including body
   * containing the JSON object for the new message to be inserted in the
   * database
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new message that was inserted in the
   * database
   */
  sendMessage = (req: Request, res: Response) =>
    MessageController.messageDao
      .userMessagesUser(req.params.senderUid, req.params.receiverUid, req.body)
      .then((message: Message) => res.json(message));

  /**
   * Retrieves all messages sent from a specified user
   * from the database and returns an array of messages.
   * @param {Request} req Represents request from client, including path
   * parameter uid to find the messages sent by that sender.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the message objects
   */
  findAllSentMessages = (req: Request, res: Response) =>
    MessageController.messageDao
      .findAllSentMessages(req.params.uid)
      .then((messages: Message[]) => res.json(messages));

  /**
   * Retrieves all messages received from a specified user
   * from the database and returns an array of messages.
   * @param {Request} req Represents request from client, including path
   * parameter uid to find the messages received by that receiver.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the message objects
   */
  findAllReceivedMessages = (req: Request, res: Response) =>
    MessageController.messageDao
      .findAllReceivedMessages(req.params.uid)
      .then((messages: Message[]) => res.json(messages));

  /**
   * @param {Request} req Represents request from client, including path
   * parameter senderUid. receiverUid identifying the primary key of the
   * User to find the message to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a message was successful or not
   */
  deleteMessage = (req: Request, res: Response) =>
    MessageController.messageDao
      .deleteMessage(req.params.mid)
      .then((status) => res.send(status));
}
