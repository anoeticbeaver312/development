import Flex from "../../layout/Flex";
import styles from "./TextField.module.css";

interface TextFieldProps {
  placeholder: string;
  defaultValue: string;
  handleOnChange: (value: string) => void;
  label: string;
}

function TextField(props: TextFieldProps) {
  return (
    <Flex direction="column">
      <label>{props.label}</label>
      <input className={styles.input} type="text" placeholder={props.placeholder} defaultValue={props.defaultValue} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleOnChange(event.target.value)} />
    </Flex>
  )
}

export default TextField;
