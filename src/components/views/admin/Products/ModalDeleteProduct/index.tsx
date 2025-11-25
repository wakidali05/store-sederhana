import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { deleteFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";

type PropTypes = {
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteProduct = (props: PropTypes) => {
  const { deletedProduct, setDeletedProduct, setProductsData, setToaster } =
    props;
  const session: any = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await productServices.deleteProduct(
      deletedProduct.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      deleteFile(
        `images/products/${deletedProduct.id}/${
          deletedProduct.image.split("%2f")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          setToaster({
            variant: "success",
            message: "success delete product",
          });
          setDeletedProduct({});
          const { data } = await productServices.getAllProducts();
          setProductsData(data.data);
        }
      );
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "failed delete product",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <h1>Are You Sure</h1>
      <Button
        type="button"
        variant="primary"
        onClick={async () => handleDelete()}
      >
        {isLoading ? "deleting..." : "yes, delete"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteProduct;
