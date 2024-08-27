import { FormEvent, useState } from "react";

import css from "./MessageForm.module.css";
import { useAuth, useChat, useMessage } from "../../store";
import { getSocket } from "../../socket";
import telegramPlane from "../../images/telegram-plane.svg";

const MessageForm = () => {
  const [message, setMessage] = useState("");

  const { currentUser } = useAuth((state) => ({
    currentUser: state.currentUser,
  }));

  const { currentChat } = useChat((state) => ({
    currentChat: state.currentChat,
  }));

  const { addMessage } = useMessage((state) => ({
    addMessage: state.addMessage,
  }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (currentChat) {
      if (message.trim()) {
        addMessage(message, currentUser?.name || "", currentChat._id!);
        const socket = getSocket();
        socket.emit("message", { text: message, chatId: currentChat._id });
        setMessage("");
      }
    }
    setMessage("");
  };

  return (
    <div className={css.wrapper}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          value={message}
        />
        <button className={css.btn}>
          <img
            className={css.btnIcon}
            src={telegramPlane}
            alt="Send"
            width={20}
            height={20}
          />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
