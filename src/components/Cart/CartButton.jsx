import { useSelector, useDispatch } from "react-redux";

import Button from "../UI/Button.jsx";

import { cartActions } from "../../store/cart.js";
import { formatPrice } from "../../utils/formatters.js";

export default function CartButton() {
  const total = useSelector((state) => state.cart.total);

  const dispatch = useDispatch();

  return (
    <Button
      animate={total > 0 ? { scale: [1, 1.2, 1] } : null}
      transition={{ duration: 0.3 }}
      type="button"
      style="button"
      key={total}
      onClick={() => dispatch(cartActions.toggleCart())}
    >
      Cart {formatPrice(total)}
    </Button>
  );
}
