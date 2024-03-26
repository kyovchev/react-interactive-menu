import { useSelector, useDispatch } from "react-redux";

import Button from "../UI/Button.jsx";

import { cartActions } from "../../store/cart.js";
import { formatPrice } from "../../utils/formatters.js";

export default function CartButton() {
  const total = useSelector((state) => state.cart.total);

  const dispatch = useDispatch();

  return (
    <Button
      type="button"
      style="button"
      onClick={() => dispatch(cartActions.toggleCart())}
    >
      Cart {formatPrice(total)}
    </Button>
  );
}
