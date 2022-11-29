import Flex from "../../layout/Flex";
import HeaderLinks from "./HeaderLinks";
import Logo from "./Logo";
import styles from "./Header.module.css";

function Header() {
  return (
    <Flex justifyContent="justifyBetween" classes={`shadow-1 ${styles.container}`}>
      <Logo />
      <HeaderLinks />
    </Flex>
  )
}

export default Header;
