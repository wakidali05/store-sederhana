import UsersAdminView from "@/components/views/admin/users";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const gettAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    gettAllUsers();
  }, []);
  return (
    <>
      <UsersAdminView users={users} />
    </>
  );
};

export default AdminUsersPage;
