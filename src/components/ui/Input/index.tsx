import styles from "./Input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
};

const Input = (props: Proptypes) => {
  const {
    label,
    name,
    type,
    placeholder,
    defaultValue,
    disabled,
    onChange,
    className,
  } = props;
  return (
    <div className={`${styles.login__form__item} ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className={styles.login__form__item__input}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
