import * as ri from "react-icons/ri";
import Flex from "../../../layout/Flex";
import styles from "./WorkerListMenuItem.module.css";

interface WorkerListMenuItemProps {
  name: string;
  handleOnClick: () => void;
  // whether or not to highlight the item
  selected: boolean;
}

function WorkerListMenuItem(props: WorkerListMenuItemProps) {
  return (
    <Flex gap="gapSmall" alignItems="alignCenter" handleOnClick={props.handleOnClick} classes={`${styles.item} ${props.selected ? styles.selected : ""}`}>
      {props.name === "Master" ? <ri.RiVipCrownLine className={styles.crown} /> : <></>}
      <p>{props.name}</p>
    </Flex>
  )
}

export default WorkerListMenuItem;
