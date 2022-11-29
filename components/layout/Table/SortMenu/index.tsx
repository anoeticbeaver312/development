import Tooltip from "../../Tooltip";
import * as ri from "react-icons/ri";
import styles from "./SortMenu.module.css";
import { useEffect, useRef, useState } from "react";

interface SortMenuProps {
  handleSortAscending: () => void;
  handleSortDescending: () => void;
}

function SortMenu(props: SortMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", (event: MouseEvent) => {
      if (container.current && event.target && !container.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    })
  }, [container])

  return (
    <div ref={container} id="div">
      <ri.RiArrowDropDownLine className={styles.dropdown} onClick={() => setMenuOpen(!menuOpen)} />
      <Tooltip open={menuOpen} position={{ x: "0", y: "0" }}>
        <div id="me" className={styles.sortItem} onClick={() => props.handleSortDescending()}>
          Sort highest to lowest
        </div>
        <div className={styles.sortItem} onClick={() => props.handleSortAscending()}>
          Sort lowest to highest
        </div>
      </Tooltip>
    </div>
  )
}

export default SortMenu;
