import styles from "./AuthLayout.module.scss";
import Link from "next/link";

type proptypes = {
  children: React.ReactNode;
  error?: string;
  title?: string;
  link: string;
  linkText?: string;
};
const AuthLayout = (props: proptypes) => {
  const { children, title, error, link, linkText } = props;
  return (
    <div className={styles.auth}>
      <h1 className={styles.auth__title}>{title}</h1>
      {error && <p className={styles.auth__error}>{error}</p>}
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
