import { FC, ReactNode, useEffect, useRef } from "react";
import css from "./Modal.module.css";
import closeIcon from "../../images/x.svg";
import { createPortal } from "react-dom";

const modalRoot: Element | null = document.querySelector("#root-modal");

interface IProps {
  onClose: (value: boolean) => void;
  children: ReactNode;
}

const Modal: FC<IProps> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose(false);
      }
    };

    const handleClose = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClose);
    document.body.classList.add("body-scroll-lock");
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClose);
      document.body.classList.remove("body-scroll-lock");
    };
  }, [onClose]);

  return modalRoot ? (
    createPortal(
      <div className={css.backdrop}>
        <div
          ref={modalRef}
          className={css.modal}
          onClick={(event) => event.stopPropagation()}
        >
          <button className={css.btnClose} onClick={() => onClose(false)}>
            <img src={closeIcon} width={32} height={32} alt="Close" />
          </button>
          <div className={css.content}>{children}</div>
        </div>
      </div>,
      modalRoot
    )
  ) : (
    <></>
  );
};

export default Modal;
