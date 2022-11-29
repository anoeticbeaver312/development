import Flex from "../../../layout/Flex";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Flex alignItems="alignCenter">
      <Flex classes={styles.iconContainer}>
        <svg className={styles.svg} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="25" fill="none" stroke="var(--orange-1)" strokeWidth="20" strokeDasharray="314.159265359 314.159265359"></circle>
        </svg>
      </Flex>
      <h1 className={styles.h1}><span className={styles.u}>u</span>nit.</h1>
    </Flex>
  )
}

export default Logo;
