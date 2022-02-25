import {Request, Response} from 'express';

export default interface MessageControllerI {
    sendMessage(req: Request, res: Response): void;

    findAllSentMessages(req: Request, res: Response): void;

    findAllReceivedMessages(req: Request, res: Response): void;

    deleteMessage(req: Request, res: Response): void;
}
