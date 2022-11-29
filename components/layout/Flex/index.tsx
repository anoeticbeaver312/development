import styles from "./Flex.module.css";

interface FlexProps {
  direction?: "column";
  gap?: "gapSmall" | "gapMedium" | "gapLarge";
  padding?: boolean;
  alignItems?: "alignCenter" | "alignStart" | "alignEnd";
  justifyContent?: "justyCenter" | "justifyStart" | "justifyEnd" | "justifyAround" | "justifyBetween";
  children: React.ReactNode;
  classes?: string;
  styling?: { [style: string]: string };
  handleOnClick?: () => void;
}

function Flex(props: FlexProps) {
  return (
    <div onClick={() => props.handleOnClick ? props.handleOnClick() : {}} style={props.styling ?? {}} className={`${styles.flexContainer} ${props.padding ? styles.padding : ""} ${styles[props.direction ?? ""] ?? ""} ${styles[props.gap ?? ""] ?? ""} ${styles[props.alignItems ?? ""] ?? ""} ${styles[props.justifyContent ?? ""] ?? ""} ${props.classes ?? ""}`}>
      {props.children}
    </div>
  )
}

export default Flex;
