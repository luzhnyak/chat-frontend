import { FC } from "react";
import css from "./Contact.module.css";
import testImg from "../../images/photo/photo-1.jpg";
// import { useChat } from "../../store";

interface IProps {
  avatar: string;
  name: string;
  lastMessage: string;
  time: string;
}

const Contact: FC<IProps> = ({ name, lastMessage, time }) => {
  // const { currentChat, getCurrentChat } = useChat((state) => ({
  //   currentChat: state.currentChat,
  //   getCurrentChat: state.getCurrentChat,
  // }));

  return (
    <div className={css.wrapper}>
      <div className={css.imageWrapper}>
        <img
          className={css.image}
          src={testImg}
          alt={name}
          width={64}
          height={64}
        />
      </div>
      <div className={css.bodyWrapper}>
        <div className={css.header}>
          <h3 className={css.name}>{name}</h3>
          <span className={css.time}>{time}</span>
        </div>
        <p className={css.lastMessage}>{lastMessage}</p>
      </div>
    </div>
  );
};

export default Contact;
