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
    title: "Users",
    url: "/admin/users",
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;
