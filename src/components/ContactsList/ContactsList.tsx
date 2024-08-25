import css from "./ContactsList.module.css";
import Contact from "../Contact/Contact";
import { useChat } from "../../store";
import { useEffect } from "react";

const ContactsList = () => {
  const { chats, getChats, getCurrentChat } = useChat((state) => ({
    chats: state.chats,
    getChats: state.getChats,
    getCurrentChat: state.getCurrentChat,
  }));

  useEffect(() => {
    getChats();
  }, [getChats]);

  return (
    <ul className={css.list}>
      {chats &&
        chats.map((chat) => {
          return (
            <li
              key={chat._id}
              onClick={() => {
                if (chat._id) getCurrentChat(chat._id);
              }}
            >
              <Contact
                name={`${chat.name} ${chat.surName}`}
                lastMessage="Hello!"
                time="22/08/2024"
                avatar=""
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ContactsList;
