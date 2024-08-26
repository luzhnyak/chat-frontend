import css from "./Chat.module.css";
import profileImg from "../../images/photo/profile.png";
import { useAuth, useChat } from "../../store";

import HeaderRight from "../HeaderRight/HeaderRight";
import ContactsList from "../ContactsList/ContactsList";
import MessageForm from "../MessageForm/MessageForm";
import Messages from "../Messages/Messages";

const Chat = () => {
  const { logout, currentUser } = useAuth((state) => ({
    logout: state.logout,
    currentUser: state.currentUser,
  }));

  const { currentChat } = useChat((state) => ({
    currentChat: state.currentChat,
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
          <button className={css.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
        <div className={css.search}>
          <input className={css.searchInput} type="text" />
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
    </div>
  );
};

export default Chat;
