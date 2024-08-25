import { useEffect } from "react";
import { useChat, useMessage } from "../../store";
import css from "./Messages.module.css";

const Messages = () => {
  const { currentChat } = useChat((state) => ({
    currentChat: state.currentChat,
  }));

  const { messages, getMessages } = useMessage((state) => ({
    messages: state.messages,
    getMessages: state.getMessages,
  }));

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
            <li className={css.item} key={message?._id}>
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
