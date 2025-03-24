import {promises as fs} from 'fs';
import {IMessage, TMessageWithoutId} from "./type";
import {randomUUID} from "node:crypto";

const pathName = './db.json';
let data: IMessage[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(pathName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            console.error(e);
            data = []
        }
    },
    async getItems() {
        return data
    },
    async addItem(item: TMessageWithoutId) {
        const message = {
            ...item,
            id: randomUUID(),
            datetime: new Date().toISOString(),
        }
        data.push(message);
        await this.save();
        return message.id;
    },
    async save() {
        await fs.writeFile(pathName, JSON.stringify(data));
    },
}

export default fileDb
