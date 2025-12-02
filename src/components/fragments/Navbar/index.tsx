import { signIn, signOut, useSession } from "next-auth/react";
import style from "./Navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import { useState } from "react";

const NavItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Products",
    url: "/products",
  },
];

const Navbar = () => {
  const { data }: any = useSession();
  const { pathname, push } = useRouter();
  const [dropdownUser, setDropdownUser] = useState(false);
  return (
    <div className={style.navbar}>
      <h1>Toko Sepatu</h1>
      <div className={style.navbar__nav}>
        {NavItems.map((item) => (
          <Link
            key={`nav-${item.title}`}
            href={item.url}
            className={`${style.navbar__nav__item} ${
              pathname === item.url && style["navbar__nav__item--active"]
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {data ? (
        <div className={style.navbar__user}>
          <div className={style.navbar__user__profile}>
            <p
              className={style.navbar__user__profile__name}
              onClick={() => setDropdownUser(!dropdownUser)}
            >
              hi, {data?.user?.fullname.split(" ")[0]}
            </p>
            <div
              className={`${style.navbar__user__profile__dropdown} ${
                dropdownUser && style["navbar__user__profile__dropdown--active"]
              }`}
            >
              <button
                className={style.navbar__user__profile__dropdown__item}
                onClick={() => push("/member/profile")}
              >
                Profile
              </button>
              <button
                className={style.navbar__user__profile__dropdown__item}
                onClick={() => push("/cart")}
              >
                Keranjang
              </button>
              <button
                onClick={() => signOut()}
                className={style.navbar__user__profile__dropdown__item}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="secondary"
          onClick={() => signIn()}
          className={style.navbar__button}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Navbar;
