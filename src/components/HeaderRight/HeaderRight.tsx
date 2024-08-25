import css from "./HeaderRight.module.css";
import { useChat } from "../../store";

const HeaderRight = () => {
  const { currentChat } = useChat((state) => ({
    currentChat: state.currentChat,
  }));

  return (
    <div className={css.wrapper}>
      <div className={css.imageWrapper}>
        <img
          className={css.image}
          src={currentChat?.avatar}
          alt={`${currentChat?.name} ${currentChat?.surName}`}
          width={64}
          height={64}
        />
      </div>
      <h3
        className={css.name}
      >{`${currentChat?.name} ${currentChat?.surName}`}</h3>
    </div>
  );
};

export default HeaderRight;
