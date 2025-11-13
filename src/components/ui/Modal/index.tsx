import { Dispatch, useEffect, useRef } from "react";
import styles from "./modal.module.scss";

type Proptypes = {
  children: React.ReactNode;
  onClose: any;
};

const Modal = (props: Proptypes) => {
  const { children, onClose } = props;
  const ref: any = useRef();
  useEffect(() => {
    const handleClickoutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickoutside);
    return () => {
      document.removeEventListener("mousedown", handleClickoutside);
    };
  }, [onClose]);

  return (
    <div className={styles.modal}>
      <div className={styles.modal__main} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
