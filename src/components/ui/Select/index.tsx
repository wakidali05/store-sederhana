import styles from "./Select.module.scss";

type Options = {
  label: string;
  value: string;
  selected?: boolean;
};

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Options[] | any;
  className?: string;
};
const Select = (props: Proptypes) => {
  const { label, name, type, defaultValue, disabled, options, className } =
    props;
  return (
    <div className={`${styles.container} ${className}`}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={styles.container__select}
      >
        {options.map((option: Options) => (
          <option
            value={option.value}
            key={option.label}
            selected={option.selected}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
