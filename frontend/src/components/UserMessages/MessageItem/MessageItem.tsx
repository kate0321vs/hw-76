import dayjs from "dayjs";

interface Props {
  author: string;
  message: string;
  datetime: string;
}

const MessageItem: React.FC<Props> = ({author, message, datetime}) => {
  return (
    <div className="card w-75 mx-auto mb-3">
      <div className="card-header">
        {author}
      </div>
      <div className="card-body">
        <p>{message}</p>
        <footer className="blockquote-footer mb-0 mt-3">{dayjs(datetime).format('YYYY-MM-DD at HH:mm')}</footer>
      </div>
    </div>
  );
};

export default MessageItem;