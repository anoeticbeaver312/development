import Tooltip from "../../Tooltip";
import * as ri from "react-icons/ri";
import styles from "./SortMenu.module.css";

interface SortMenuProps {
  handleSortAscending: () => void;
  handleSortDescending: () => void;
}

function SortMenu(props: SortMenuProps) {
  return (
    <div>
      <ri.RiArrowDropDownLine onClick={() => { }} />
      <Tooltip open={true} position={{ x: "0", y: "0" }}>
        <div className={styles.sortItem} onClick={() => props.handleSortDescending()}>
          Sort highest to lowest
        </div>
        <div className={styles.sortItem} onClick={() => props.handleSortAscending()}>
          Sort lowest to highest
        </div>
      </Tooltip>
    </div >
  )
}

export default SortMenu;
