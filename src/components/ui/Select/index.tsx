import styles from "./Select.module.scss";

type Options = {
  label: string;
  value: string;
};

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Options[];
};
const Select = (props: Proptypes) => {
  const { label, name, type, defaultValue, disabled, options } = props;
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={styles.container__select}
      >
        {options.map((option) => (
          <option value={option.value} key={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
