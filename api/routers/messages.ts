import express from 'express';
import fileDb from "../fileDb";
import {TMessageWithoutId} from "../type";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getItems();

    if (req.query.datetime) {
        const queryDate = req.query.datetime as string;
        const date = new Date(queryDate);

        if (isNaN(date.getDate())) {
            res.status(400).send({"error": "Invalid datetime"});
            return;
        }

        const filteredMessages = messages.filter(message => new Date(message.datetime) > date);
        res.send(filteredMessages);
        return
    }

    res.send(messages.slice(-30));
});

messagesRouter.post('/', async (req, res) => {
    if (!req.body.message || !req.body.author) {
        res.status(400).send({'error': 'Author and message must be present in the request'});
        return
    }

    const message: TMessageWithoutId = {
        message: req.body.message,
        author: req.body.author,
    };
    const savedMessage = await fileDb.addItem(message)

    res.send(savedMessage);
});

export default messagesRouter;