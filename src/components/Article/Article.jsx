import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../UI/Button.jsx";

import { cartActions } from "../../store/cart.js";
import { formatPrice } from "../../utils/formatters.js";

import styles from "./Article.module.css";

export default function Article({ article }) {
  const dispatch = useDispatch();

  function handleAddToCart(event, article) {
    event.preventDefault();
    dispatch(cartActions.addArticle(article));
  }

  return (
    <Link to={`/menu/articles/${article.id}`} className={styles.buttonArticle}>
      <article className={styles.article}>
        <div className={styles.articleContent}>
          <div>
            <h2>{article.title}</h2>
            <p className={styles.articlePrice}>{formatPrice(article.price)}</p>
            <Button
              type="button"
              style="button"
              onClick={(event) => handleAddToCart(event, article)}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}
