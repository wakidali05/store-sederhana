import { useRouter } from "next/router";
import styles from "./register.module.scss";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

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

    const result = await authServices.resgisterAccount(data);

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
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Have an account? sign in "
      error={error}
    >
      <form onSubmit={handleSubmit}>
        <Input label="Fullname" name="fullname" type="text" />
        <Input label="Email" name="email" type="email" />
        <Input label="Phone" name="phone" type="number" />
        <Input label="Password" name="password" type="password" />
        <Button
          variant="primary"
          className={styles.register__form__button}
          type="submit"
        >
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
