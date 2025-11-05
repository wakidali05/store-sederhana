import { useRouter } from "next/router";
import styles from "./register.module.scss";
import Link from "next/link";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError("");

    // Handle form submission logic here
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("email already registered");
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label
              htmlFor="fullname"
              className={styles.register__form__item__label}
            >
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="email"
              className={styles.register__form__item__label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="phone"
              className={styles.register__form__item__label}
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="password"
              className={styles.register__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.register__form__item__input}
            />
          </div>
          <button className={styles.register__form__button} type="submit">
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p>
        Have an account? sign in here{" "}
        <Link href="/auth/login" className={styles.register__link}>
          login
        </Link>
      </p>
    </div>
  );
};

export default RegisterView;
