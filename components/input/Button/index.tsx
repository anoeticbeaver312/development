import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  type: "normal";
  icon?: React.ReactElement;
  handleOnClick: () => void;
}

function Button(props: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[props.type]}`} onClick={props.handleOnClick}>
      {props.icon}
      {props.text}
    </button>
  )
}

export default Button;
