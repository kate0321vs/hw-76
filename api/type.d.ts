export interface IMessage {
    id: string;
    message: string;
    author: string;
    datetime: string;
}

export type TMessageWithoutId = Omit<IMessage, 'id', 'datetime'>