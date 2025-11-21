import LoginView from "@/components/views/auth/Login";
import { Dispatch, SetStateAction } from "react";

const login = ({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) => {
  return (
    <>
      <LoginView setToaster={setToaster} />
    </>
  );
};

export default login;
