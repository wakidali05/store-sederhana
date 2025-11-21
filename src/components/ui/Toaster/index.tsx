import styles from "./Toaster.module.scss";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type propTypes = {
  variant: string;
  message?: string;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const toasterVariant: any = {
  success: {
    title: "Success",
    color: "#a3d9a5",
    barColor: "#3f9242",
  },
  danger: {
    title: "Error",
    color: "#f39b9a",
    barColor: "#bb2525",
  },
  warning: {
    title: "Warning",
    color: "#f8e3a2",
    barColor: "#e9b949",
  },
};
const Toaster = (props: propTypes) => {
  const { variant = "success", message, setToaster } = props;
  const [lengthBar, setLengthBar] = useState(100);
  const timeRef = useRef<any>(null);

  const timerStart = () => {
    timeRef.current = setInterval(() => {
      setLengthBar((prevLength) => prevLength - 0.17);
    }, 1);
  };
  useEffect(() => {
    timerStart();
    return () => {
      clearInterval(timeRef.current);
    };
  }, []);

  return (
    <div className={`${styles.toaster} ${styles[`toaster__${variant}`]}`}>
      <div className={styles.toaster__main}>
        <div className={styles.toaster__main__text}>
          <p className={styles.toaster__main__text__title}>
            {toasterVariant[variant].title}
          </p>
          <p className={styles.toaster__main__text__message}>{message}</p>
        </div>
        <div
          className={styles.toaster__main__close}
          onClick={() => {
            setToaster({});
          }}
        >
          x
        </div>
      </div>

      <div
        className={`${styles.toaster__timer}`}
        style={{
          backgroundColor: toasterVariant[variant].color,
        }}
      >
        <div
          style={{
            width: `${lengthBar}%`,
            height: "100%",
            backgroundColor: toasterVariant[variant].barColor,
          }}
        />
      </div>
    </div>
  );
};

export default Toaster;
