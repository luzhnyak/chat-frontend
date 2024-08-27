import css from "./ContactsList.module.css";
import Contact from "../Contact/Contact";
import { useChat } from "../../store";
import { useEffect, useState } from "react";
import { IChat } from "../../types";

const ContactsList = () => {
  const [displayChats, setDisplayChats] = useState<IChat[]>([]);
  const { chats, filter, getChats, getCurrentChat } = useChat((state) => ({
    chats: state.chats,
    filter: state.filter,
    getChats: state.getChats,
    getCurrentChat: state.getCurrentChat,
  }));

  useEffect(() => {
    getChats();
  }, [getChats]);

  useEffect(() => {
    if (chats) {
      setDisplayChats([...chats!]);
      if (filter) {
        setDisplayChats([
          ...chats!.filter(
            (item) =>
              item.name.toLowerCase().includes(filter.toLowerCase()) ||
              item.surName.toLowerCase().includes(filter.toLowerCase())
          ),
        ]);
      }
    }
  }, [filter, chats]);

  return (
    <ul className={css.list}>
      {chats &&
        displayChats.map((chat, idx) => {
          return (
            <li
              key={chat._id}
              onClick={() => {
                if (chat._id)
                  getCurrentChat(chat._id, `/avatars/${idx + 1}.jpg`);
              }}
            >
              <Contact
                id={chat?._id || ""}
                name={chat.name}
                surName={chat.surName}
                lastMessage={chat?.lastMessage || ""}
                time={chat && new Date(chat.updatedAt!).toLocaleString()}
                avatar={`/avatars/${idx + 1}.jpg`}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ContactsList;
