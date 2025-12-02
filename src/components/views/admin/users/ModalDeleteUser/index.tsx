import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { Dispatch, SetStateAction, useState } from "react";

type PropTypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  deletedUser: User | any;
  setdeletedUser: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteUser = (props: PropTypes) => {
  const { deletedUser, setdeletedUser, setUsersData, setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await userServices.deleteUser(deletedUser.id);
    if (result.status === 200) {
      setIsLoading(false);
      setToaster({
        variant: "success",
        message: "success delete user",
      });
      setdeletedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "failed delete user",
      });
    }
  };
  return (
    <Modal onClose={() => setdeletedUser({})}>
      <h1>Are You Sure</h1>
      <Button
        type="button"
        variant="primary"
        onClick={async () => handleDelete()}
      >
        {isLoading ? "deleting..." : "yes, delete"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
