import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";
import { title } from "process";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
  },
  {
    title: "Products",
    url: "/admin/products",
  },
  {
    title: "Profile",
    url: "/admin/profile",
  },
  {
    title: "users",
    url: "/admin/users",
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
};

export default AdminLayout;
