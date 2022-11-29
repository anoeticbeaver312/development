import Flex from "../Flex";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  open: boolean;
  children: React.ReactNode;
  position: { x: string, y: string };
}

function Tooltip(props: TooltipProps) {
  return (
    <Flex styling={{ left: props.position.x, right: props.position.y }} classes={`${styles.tooltip} ${props.open ? "" : styles.inactive}`} direction="column">
      {props.children}
    </Flex>
  )
}

export default Tooltip;
