import Contact from "../Contact/Contact";
import css from "./Chat.module.css";
import testImg from "../../images/photo/photo-3.jpg";
import { useAuth } from "../../store";
import HeaderRight from "../HeaderRight/HeaderRight";

const Chat = () => {
  const { logout } = useAuth((state) => ({
    logout: state.logout,
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
          <button className={css.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
        <div className={css.search}>
          <input className={css.searchInput} type="text" />
        </div>
        <ul className={css.list}>
          <li>
            <Contact
              name="Oleg"
              lastMessage="Hello!"
              time="22/08/2024"
              avatar=""
            />
          </li>
          <li>
            <Contact
              name="Oleg"
              lastMessage="Hello!"
              time="22/08/2024"
              avatar=""
            />
          </li>
        </ul>
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
