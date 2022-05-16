import React, { useEffect, MouseEventHandler, ReactNode } from "react";
import styles from "./modal.module.css";

// todo tab trapping, onClickOutside

type ModalProps = {
  onClose: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

function Modal(props: ModalProps) {
  const { onClose, children } = props;
  useEffect(() => {
    document.querySelector("body")?.classList.add("has-opened-modal");
    return () =>
      document.querySelector("body")?.classList.remove("has-opened-modal");
  }, []);

  return (
    <div className={styles["modal-container"]} role="dialog" tabIndex={-1}>
      <div className={styles.modal} role="dialog">
        <button
          type="button"
          aria-label="Close dialog"
          className={styles.modal__btn}
          onClick={onClose}
        >
          ✕
        </button>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
