import { useIsFetching } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import Cart from "../Cart/Cart.jsx";
import CartButton from "../Cart/CartButton.jsx";

import favIcon from "../../../public/favicon.png";

import styles from "./Header.module.css";

export default function Header({ children }) {
  const fetching = useIsFetching();

  const navigate = useNavigate();

  const showCart = useSelector((state) => state.cart.showCart);

  return (
    <>
      <div className={styles.loading}>{fetching > 0 && <progress />}</div>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1 onClick={() => navigate("/menu")}>
            React Menu
            <img src={favIcon} alt="strawberry icon" />
          </h1>
        </div>
        <nav>
          {children}
          <CartButton />
        </nav>
      </header>
    </>
  );
}
