import { useEffect, useState } from 'react';
import {Messages} from "../../types";
import UserForm from "../../components/UserForm/UserForm.tsx";
import UserMessages from "../../components/UserMessages/UserMessages.tsx";
import axiosApi from "../../../axiosApi.ts";
import {Container} from "@mui/material";

const Chat = () => {
  const [userMessages, setUserMessages] = useState<Messages[]>([]);
  const [lastDateTimeOfMessage, setLastDateTimeOfMessage] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUrl = lastDateTimeOfMessage ?
          `/messages?datetime=${lastDateTimeOfMessage}` : '/messages';

        const response = await axiosApi.get(fetchUrl);
        const posts: Messages[] = response.data;
          if (posts.length > 0) {
            posts.reverse();
            setLastDateTimeOfMessage(posts[posts.length - 1].datetime);
            setUserMessages(prevState => {
              const newMessages = posts.filter(message => {
                const existingMessage = prevState.find(prevMessage => prevMessage.id === message.id);
                return !existingMessage;
              });
              return [...newMessages, ...prevState];
            });
          }
      } catch (e) {
        console.error("Error", e);
      }
    };

    void fetchData();
    const interval = setInterval(async () => {
      void fetchData()
    }, 3000);
    return () => clearInterval(interval);

  }, [lastDateTimeOfMessage]);

  return (
    <Container>
      <UserForm/>
      {userMessages.length > 0 ?
        <>
          <UserMessages userMessages={userMessages}/>
        </>
        :
        <p className="w-75 mx-auto">No Messages</p>
      }
    </Container>
  );
};

export default Chat;