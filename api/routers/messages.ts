import express from 'express';
import fileDb from "../fileDb";
import {TMessageWithoutId} from "../type";
const messagesRouter = express.Router();


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