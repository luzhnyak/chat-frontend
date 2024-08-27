import css from "./Form.module.css";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useChat } from "../../store";
import { FC } from "react";

const loginSchema = yup.object({
  name: yup.string().required(),
  surName: yup.string().required(),
});

export interface SubmitValues {
  name: string;
  surName: string;
}

export interface IProps {
  chatData?: { id: string; name: string; surName: string };
  onClose: () => void;
}

const AddChatForm: FC<IProps> = ({ onClose, chatData }) => {
  const { addChat, updateChat } = useChat((state) => ({
    addChat: state.addChat,
    updateChat: state.updateChat,
  }));

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SubmitValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      name: chatData?.name || "",
      surName: chatData?.surName || "",
    },
  });

  const onSubmit: SubmitHandler<SubmitValues> = async (data) => {
    if (chatData) {
      updateChat(chatData.id, data.name, data.surName);
    } else {
      addChat(data.name, data.surName);
    }

    onClose();
  };

  return (
    <div className={css.modalWrapper}>
      <h3 className={css.title}>{chatData ? "Edit chat" : "Add new chat"}</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <input
            className={`${css.input} ${errors.name ? css.inputError : ""}`}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors && (
            <span className={css.errormessage}>{errors.name?.message}</span>
          )}
        </div>
        <div className={css.inputWrapper}>
          <input
            className={`${css.input} ${errors.surName ? css.inputError : ""}`}
            type="text"
            placeholder="Surname"
            {...register("surName")}
          />
          {errors && (
            <span className={css.errormessage}>{errors.surName?.message}</span>
          )}
        </div>
        <button className={css.btn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddChatForm;
