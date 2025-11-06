import { useRouter } from "next/router";
import styles from "./login.module.scss";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const { push, query } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError("");

    // Handle form submission logic here
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Invalid email or password");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label htmlFor="email" className={styles.login__form__item__label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.login__form__item__input}
            />
          </div>

          <div className={styles.login__form__item}>
            <label
              htmlFor="password"
              className={styles.login__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.login__form__item__input}
            />
          </div>
          <button className={styles.login__form__button} type="submit">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <p>
        Do not have an account? sign up here{" "}
        <Link href="/auth/register" className={styles.login__link}>
          register
        </Link>
      </p>
    </div>
  );
};

export default LoginView;
