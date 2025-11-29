import { Product } from "@/types/product.type";
import styles from "./Card.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";

type Proptypes = {
  products: Product;
};

const Card = (props: Proptypes) => {
  const { products } = props;
  return (
    <div className={styles.product__main__content__item}>
      <Image
        src={products.image}
        alt="image"
        width="500"
        height="500"
        className={styles.product__main__content__item__image}
      />
      <h4 className={styles.product__main__content__item__title}>
        {products.name}
      </h4>
      <p className={styles.product__main__content__item__category}>
        {products.category}
      </p>
      <p className={styles.product__main__content__item__price}>
        {convertIDR(products.price)}
      </p>
    </div>
  );
};

export default Card;
