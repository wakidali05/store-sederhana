import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

const ModalUpdateUser = (props: any) => {
  const { modalUpdate, setmodalUpdate, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Handle form submission logic here
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUsers(
      modalUpdate.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      setmodalUpdate({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={() => setmodalUpdate({})}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={modalUpdate.fullname}
          disabled
        />
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={modalUpdate.email}
          disabled
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          defaultValue={modalUpdate.phone}
          disabled
        />
        <Select
          label="Role"
          name="role"
          defaultValue={modalUpdate.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
          type={""}
        />
        <Button type="submit" variant="secondary">
          Update
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
