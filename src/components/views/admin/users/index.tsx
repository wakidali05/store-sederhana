import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./users.module.scss";
import { useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";

type PropTypes = {
  users: any;
};

const UsersAdminView = (props: PropTypes) => {
  const { users } = props;
  const [modalUpdate, setmodalUpdate] = useState<any>({});
  const [deletedUser, setdeletedUser] = useState<any>({});
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    setUsersData(users);
  }, [users]);
  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h1>User Management</h1>
          <table className={styles.users__table}>
            <thead>
              <tr>
                <th>No</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: any, index: number) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={styles.users__table__action}>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => setmodalUpdate(user)}
                        className={styles.users__table__action__edit}
                      >
                        Update
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        className={styles.users__table__action__delete}
                        onClick={() => setdeletedUser(user)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(modalUpdate).length && (
        <ModalUpdateUser
          modalUpdate={modalUpdate}
          setmodalUpdate={setmodalUpdate}
          setUsersData={setUsersData}
        />
      )}
      {Object.keys(deletedUser).length && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setdeletedUser={setdeletedUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
};

export default UsersAdminView;
