import styles from "./Flex.module.css";

interface FlexProps {
  direction?: "column";
  gap?: boolean;
  alignItems?: "alignCenter" | "alignStart" | "alignEnd";
  justifyContent?: "justyCenter" | "justifyStart" | "justifyEnd" | "justifyAround" | "justifyBetween";
  children: JSX.Element | JSX.Element[];
  styling?: string;
}

function Flex(props: FlexProps) {
  return (
    <div className={`${styles.flexContainer} ${props.gap ? styles.gap : ""} ${styles[props.alignItems ?? ""] ?? ""} ${styles[props.justifyContent ?? ""] ?? ""} ${props.styling ?? ""}`}>
      {props.children}
    </div>
  )
}

export default Flex;
