import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Products.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";

type PropTypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProductsAdminView = (props: PropTypes) => {
  const { products, setToaster } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);
  useEffect(() => {
    setProductsData(products);
  }, [products]);
  return (
    <>
      <AdminLayout>
        <div className={styles.products}>
          <h1>Product Management</h1>
          <table className={styles.products__table}>
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Image</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2}>Price</th>
                <th colSpan={2}>Stock</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Size</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((products, index) => (
                <>
                  <tr key={products.id}>
                    <td rowSpan={products.stock.length}>{index + 1}</td>
                    <td rowSpan={products.stock.length}>
                      <Image
                        src={products.image}
                        alt={products.name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td rowSpan={products.stock.length}>{products.name}</td>
                    <td rowSpan={products.stock.length}>{products.category}</td>
                    <td rowSpan={products.stock.length}>
                      {convertIDR(products.price)}
                    </td>
                    <td>{products.stock[0].size}</td>
                    <td>{products.stock[0].qty}</td>
                    <td rowSpan={products.stock.length}>
                      <div className={styles.products__table__action}>
                        <Button
                          type="button"
                          variant="primary"
                          className={styles.products__table__action__edit}
                        >
                          Update
                        </Button>
                        <Button
                          type="button"
                          variant="primary"
                          className={styles.products__table__action__delete}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {products.stock.map((stock, index: number) => (
                    <>
                      {index > 0 && (
                        <tr key={stock.size}>
                          <td>{stock.size}</td>
                          <td>{stock.qty}</td>
                        </tr>
                      )}
                    </>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductsAdminView;
