import { FC } from "react";
import css from "./HeaderRight.module.css";
import testImg from "../../images/photo/photo-1.jpg";

interface IProps {
  avatar: string;
  name: string;
}

const HeaderRight: FC<IProps> = ({ name }) => {
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
      <h3 className={css.name}>{name}</h3>
    </div>
  );
};

export default HeaderRight;
