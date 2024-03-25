import { useIsFetching } from "@tanstack/react-query";

import favIcon from "../../../public/favicon.png";

import styles from "./Header.module.css";

export default function Header({ children }) {
  const fetching = useIsFetching();

  return (
    <>
      <div className={styles.loading}>{fetching > 0 && <progress />}</div>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>
            React Menu
            <img src={favIcon} alt="strawberry icon" />
          </h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
