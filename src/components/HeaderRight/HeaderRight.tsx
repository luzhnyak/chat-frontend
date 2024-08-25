import { FC } from "react";
import css from "./HeaderRight.module.css";
import testImg from "../../images/photo/photo-1.jpg";
import { useChat } from "../../store";

interface IProps {
  avatar: string;
  name: string;
}

const HeaderRight: FC<IProps> = ({ name }) => {
  const { currentChat } = useChat((state) => ({
    currentChat: state.currentChat,
  }));

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
      <h3
        className={css.name}
      >{`${currentChat?.name} ${currentChat?.surName}`}</h3>
    </div>
  );
};

export default HeaderRight;
