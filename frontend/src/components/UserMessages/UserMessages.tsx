import MessageItem from './MessageItem/MessageItem.tsx';
import {Messages} from "../../types";


interface Props {
  userMessages: Messages[];
}

const UserMessages: React.FC<Props> = ({userMessages}) => {
  return (
    <>
      {userMessages.map((message) => (
         <MessageItem key={message.id}
                      author={message.author}
                      message={message.message}
                      datetime={message.datetime}
         />
        )
      )}
    </>
  );
};

export default UserMessages;