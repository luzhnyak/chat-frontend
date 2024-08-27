import css from "./Chat.module.css";
import profileImg from "../../images/photo/profile.png";
import { useAuth, useChat } from "../../store";

import HeaderRight from "../HeaderRight/HeaderRight";
import ContactsList from "../ContactsList/ContactsList";
import MessageForm from "../MessageForm/MessageForm";
import Messages from "../Messages/Messages";
import { useState } from "react";
import Modal from "../Modal/Modal";
import AddChatForm from "../Forms/AddChatForm";

const Chat = () => {
  const [showAddForm, setAddForm] = useState(false);
  const { logout, currentUser } = useAuth((state) => ({
    logout: state.logout,
    currentUser: state.currentUser,
  }));

  const { currentChat, setFilter } = useChat((state) => ({
    currentChat: state.currentChat,
    setFilter: state.setFilter,
  }));

  return (
    <div className={css.wrapper}>
      <div className={css.left}>
        <div className={css.headerLeft}>
          <div className={css.imageWrapper}>
            <img
              className={css.image}
              src={profileImg}
              alt={currentUser?.name}
              width={50}
              height={50}
            />
          </div>
          <h1 className={css.userName}>{currentUser?.name}</h1>
          <div className={css.btnWrapper}>
            <button className={css.logoutBtn} onClick={() => setAddForm(true)}>
              New
            </button>
            <button className={css.logoutBtn} onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <div className={css.search}>
          <input
            className={css.searchInput}
            type="text"
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          />
        </div>
        <ContactsList />
      </div>
      <div className={css.right}>
        {currentChat && (
          <>
            <HeaderRight />
            <Messages />
            <MessageForm />
          </>
        )}
      </div>
      {showAddForm && (
        <Modal onClose={() => setAddForm(false)}>
          <AddChatForm onClose={() => setAddForm(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Chat;
