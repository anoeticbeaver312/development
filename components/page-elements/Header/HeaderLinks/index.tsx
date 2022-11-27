import Link from "next/link";
import Flex from "../../../layout/Flex";
import styles from "./HeaderLinks.module.css";
import * as ri from "react-icons/ri";
import { useRouter } from "next/router";

function HeaderLinks() {
  const router = useRouter();

  return (
    <Flex alignItems="alignCenter" gap>
      <Link className={styles.link} href="/"><ri.RiHome2Line /><span className={router.pathname === "/" ? styles.underline : ""}>Dashboard</span></Link>
      <Link className={styles.link} href="/workers"><ri.RiHammerLine /><span className={router.pathname === "/workers" ? styles.underline : ""}>Worker Lists</span></Link>
    </Flex>
  )
}

export default HeaderLinks;
