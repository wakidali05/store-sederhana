import { useRouter } from "next/router";
import styles from "./login.module.scss";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";

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
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Do not have an account? sign up "
    >
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <Button
          variant="primary"
          className={styles.login__form__button}
          type="submit"
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className={styles.login__form__divider} />
      <div className={styles.login__form__other}>
        <Button
          type="button"
          variant="primary"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
          className={styles.login__form__other__button}
        >
          <i className="bxl bx-google"></i> Login with Google
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
