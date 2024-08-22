import Contact from "../Contact/Contact";
import css from "./Chat.module.css";

const Chat = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.left}>
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
      <div className={css.right}></div>
    </div>
  );
};

export default Chat;
