import ProductView from "@/components/views/products";
import productServices from "@/services/product";
import Head from "next/head";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const gettAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    gettAllProducts();
  }, []);
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductView products={products} />
    </>
  );
};

export default ProductPage;
