import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import Button from "../UI/Button.jsx";
import Modal from "../UI/Modal.jsx";
import { FormActions } from "../UI/Form.jsx";

import { formatPrice } from "../../utils/formatters.js";
import { cartActions } from "../../store/cart.js";
import CartItem from "./CartArticle.jsx";

import styles from "./Cart.module.css";

export default function Cart() {
  const dispatch = useDispatch();

  const total = useSelector((state) => state.cart.total);
  const articles = useSelector((state) => state.cart.articles);

  function handleClose() {
    dispatch(cartActions.toggleCart());
  }

  return (
    <Modal onClose={handleClose}>
      {total === 0 && <p>Cart is empty!</p>}
      {total > 0 && (
        <>
          <div>
            {Object.values(articles).map((article) => (
              <CartItem key={article.id} article={article} />
            ))}
          </div>

          <p className={styles.total}>
            Total:{" "}
            <motion.span
              key={total}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.2 }}
              className={styles.price}
            >
              {formatPrice(total)}
            </motion.span>
          </p>
        </>
      )}
      <FormActions>
        <Button type="button" style="button" onClick={handleClose}>
          Close
        </Button>
      </FormActions>
    </Modal>
  );
}
