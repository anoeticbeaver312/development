import Flex from "../../layout/Flex";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  // map display value to form value
  options: Map<string, string>;
  handleOnChange: (newValue: string) => void;
  label: string;
  defaultValue: string;
}

function Dropdown(props: DropdownProps) {
  return (
    <Flex direction="column">
      <label>
        {props.label}
      </label>
      <select value={props.defaultValue} className={styles.dropdown} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => props.handleOnChange(event.target.value)}>
        {[...props.options.keys()].map((displayValue: string, i: number) =>
          <option key={i} value={props.options.get(displayValue)}>{displayValue}</option>)}
      </select>
    </Flex>
  )
}

export default Dropdown;
