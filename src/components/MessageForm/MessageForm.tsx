import { FormEvent, useState } from "react";
import css from "./MessageForm.module.css";
import { useChat, useMessage } from "../../store";

const MessageForm = () => {
  const [message, setMessage] = useState("");

  const { currentChat } = useChat((state) => ({
    currentChat: state.currentChat,
  }));

  const { addMessage } = useMessage((state) => ({
    addMessage: state.addMessage,
  }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("message", message);
    if (currentChat) {
      addMessage(message, currentChat._id!);
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
        <button className={css.btn}>Send</button>
      </form>
    </div>
  );
};

export default MessageForm;
