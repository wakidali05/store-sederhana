import { Dispatch, SetStateAction } from "react";
import styles from "./AuthLayout.module.scss";
import Link from "next/link";

type proptypes = {
  children: React.ReactNode;
  title?: string;
  link: string;
  linkText?: string;
  setToaster: Dispatch<SetStateAction<{}>>;
};
const AuthLayout = (props: proptypes) => {
  const { children, title, link, linkText } = props;
  return (
    <div className={styles.auth}>
      <h1 className={styles.auth__title}>{title}</h1>
      <div className={styles.auth__form}>{children}</div>
      <p>
        {linkText}
        <Link href={link} className={styles.auth__link}>
          here
        </Link>
      </p>
    </div>
  );
};

export default AuthLayout;
