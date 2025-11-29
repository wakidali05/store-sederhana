import CartView from "@/components/views/cart";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type propTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const CartPage = (props: propTypes) => {
  const { setToaster } = props;
  const [cart, setCart] = useState([]);
  const session: any = useSession();
  const [products, setProducts] = useState([]);

  const getCart = async (token: string) => {
    const { data } = await userServices.getCart(token);
    setCart(data.data);
  };
  const gettAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    gettAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <CartView cart={cart} products={products} />
    </>
  );
};

export default CartPage;
