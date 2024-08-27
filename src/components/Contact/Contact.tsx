import { FC, useState } from "react";
import css from "./Contact.module.css";
import { useChat } from "../../store";
import Modal from "../Modal/Modal";
import AddChatForm from "../Forms/AddChatForm";

interface IProps {
  id: string;
  avatar: string;
  name: string;
  surName: string;
  lastMessage: string;
  time: string;
}

const Contact: FC<IProps> = ({
  id,
  avatar,
  name,
  surName,
  lastMessage,
  time,
}) => {
  const [showEditForm, setEditForm] = useState(false);
  const { deleteChat } = useChat((state) => ({
    updateChat: state.updateChat,
    deleteChat: state.deleteChat,
  }));

  return (
    <div className={css.wrapper}>
      <div className={css.imageWrapper}>
        <img
          className={css.image}
          src={avatar}
          alt={name}
          width={64}
          height={64}
        />
      </div>
      <div className={css.bodyWrapper}>
        <div className={css.header}>
          <h3 className={css.name}>{`${name} ${surName}`}</h3>
          <span className={css.time}>{time}</span>
        </div>
        <p className={css.lastMessage}>{lastMessage}</p>
        <div className={css.btnWrapper}>
          <button
            className={css.btn}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setEditForm(true);
            }}
          >
            edit
          </button>
          <button
            className={css.btn}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              deleteChat(id || "");
            }}
          >
            delete
          </button>
        </div>
      </div>
      {showEditForm && (
        <Modal onClose={() => setEditForm(false)}>
          <AddChatForm
            chatData={{ id, name, surName }}
            onClose={() => setEditForm(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Contact;
