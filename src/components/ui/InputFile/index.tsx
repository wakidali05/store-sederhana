import { Dispatch, SetStateAction } from "react";
import styles from "./Input.module.scss";

type propTypes = {
  uploadedImage: File | null;
  name: string;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
};

const InputFile = (props: propTypes) => {
  const { uploadedImage, setUploadedImage, name } = props;
  return (
    <div className={styles.file}>
      <label htmlFor={name} className={styles.file__label}>
        {uploadedImage?.name ? (
          <p>{uploadedImage.name}</p>
        ) : (
          <>
            <p>upload a new image</p>
            <p>
              maximum upload is <b>1 mb</b>
            </p>
          </>
        )}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className={styles.file__input}
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.currentTarget.files[0]);
        }}
      />
    </div>
  );
};

export default InputFile;
