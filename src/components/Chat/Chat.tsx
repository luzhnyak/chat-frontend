import css from "./Chat.module.css";
import testImg from "../../images/photo/photo-3.jpg";
import { useAuth } from "../../store";
import HeaderRight from "../HeaderRight/HeaderRight";
import ContactsList from "../ContactsList/ContactsList";

const Chat = () => {
  const { logout, currentUser } = useAuth((state) => ({
    logout: state.logout,
    currentUser: state.currentUser,
  }));

  return (
    <div className={css.wrapper}>
      <div className={css.left}>
        <div className={css.headerLeft}>
          <div className={css.imageWrapper}>
            <img
              className={css.image}
              src={testImg}
              alt={"Oleg Luzhnyak"}
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
        <HeaderRight name="Oleg" avatar="" />
        <div className={css.enter}>
          <input className={css.enterInput} type="text" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
