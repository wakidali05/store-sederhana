import { Dispatch, SetStateAction } from "react";
import RegisterView from "../../components/views/auth/Register";

const register = ({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) => {
  return (
    <>
      <RegisterView setToaster={setToaster} />
    </>
  );
};

export default register;
