import React, { useEffect, useRef, MouseEventHandler, ReactNode } from "react";
import styles from "./modal.module.css";
import useOnClickOutside from "../../hooks/use-on-click-outside";

type ModalProps = {
  onClose: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

// todo focus trapping
function Modal(props: ModalProps) {
  const { onClose, children } = props;
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, onClose);

  useEffect(() => {
    document.querySelector("body")?.classList.add("has-opened-modal");
    return () =>
      document.querySelector("body")?.classList.remove("has-opened-modal");
  }, []);

  return (
    <div className={styles["modal-container"]}>
      <div ref={modalRef} className={styles.modal} role="dialog" tabIndex={-1}>
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
