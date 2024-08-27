import { useEffect } from "react";
import { useAuth, useChat, useMessage, useToken } from "../../store";
import css from "./Messages.module.css";
import { connectSocket, disconnectSocket, getSocket } from "../../socket";

const Messages = () => {
  const { currentChat } = useChat((state) => ({
    currentChat: state.currentChat,
  }));

  const { currentUser } = useAuth((state) => ({
    currentUser: state.currentUser,
  }));

  const { messages, getMessages, addMessage } = useMessage((state) => ({
    messages: state.messages,
    getMessages: state.getMessages,
    addMessage: state.addMessage,
  }));

  const { token } = useToken((state) => ({
    token: state.token,
  }));

  useEffect(() => {
    connectSocket(token!);

    const socket = getSocket();

    socket.on(
      "message",
      (msg: { text: string; author: string; chatId: string }) => {
        addMessage(msg.text, msg.author, msg.chatId);
      }
    );

    return () => {
      socket.off("message");
      disconnectSocket();
    };
  }, [token, addMessage]);

  useEffect(() => {
    if (currentChat) {
      getMessages(currentChat._id!);
    }
  }, [getMessages, currentChat]);

  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {messages?.map((message) => {
          return (
            <li
              className={
                message.author === currentUser?.name ? css.itemOwn : css.item
              }
              key={message?._id}
            >
              <span className={css.message}>{message?.text}</span>
              <span>
                {message && new Date(message.createdAt!).toLocaleString()}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Messages;
