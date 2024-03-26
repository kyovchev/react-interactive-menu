import { useDispatch } from "react-redux";

import Button from "../UI/Button.jsx";

import { cartActions } from "../../store/cart.js";
import { formatPrice } from "../../utils/formatters.js";

import styles from "./CartArticle.module.css";

export default function CartArticle({ article }) {
  const dispatch = useDispatch();

  function changeQuantity(quantity) {
    dispatch(
      cartActions.changeQuantity({
        id: article.id,
        quantity: article.quantity + quantity,
      })
    );
  }

  return (
    <p className={styles.p}>
      {article.title}

      <span className={styles.controls}>
        <span className={styles.price}>{formatPrice(article.price)}</span>
        <Button type="button" style="button" onClick={() => changeQuantity(-1)}>
          -
        </Button>
        <span className={styles.quantity}>{article.quantity}</span>
        <Button type="button" style="button" onClick={() => changeQuantity(1)}>
          +
        </Button>
      </span>
    </p>
  );
}
