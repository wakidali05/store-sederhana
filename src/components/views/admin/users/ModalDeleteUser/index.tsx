import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setdeletedUser, setUsersData } = props;
  const handleDelete = async () => {
    userServices.deleteUser(deletedUser.id);
    setdeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
  };
  return (
    <Modal onClose={() => setdeletedUser({})}>
      <h1>Are You Sure</h1>
      <Button
        type="button"
        variant="primary"
        onClick={async () => handleDelete()}
      >
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
