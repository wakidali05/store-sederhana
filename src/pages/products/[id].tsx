import DetailProductPage from "@/components/views/detailProduct";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type propTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const DetailsProductPage = (props: propTypes) => {
  const { setToaster } = props;
  const { id } = useRouter().query;
  const session: any = useSession();
  const [product, setProduct] = useState<Product | {}>({});
  const [cart, setCart] = useState([]);
  const getDetailsProduct = async (id: string) => {
    const { data } = await productServices.getDetailProduct(id);
    setProduct(data.data);
  };

  const getCart = async (token: string) => {
    const { data } = await userServices.getCart(token);
    setCart(data.data);
  };

  useEffect(() => {
    getDetailsProduct(id as string);
  }, [id]);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Products Details</title>
      </Head>
      <DetailProductPage
        product={product}
        cart={cart}
        productId={id}
        setToaster={setToaster}
      />
    </>
  );
};

export default DetailsProductPage;
