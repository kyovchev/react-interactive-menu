import { Link } from "react-router-dom";

import { formatPrice } from "../../utils/formatters.js";

import styles from "./Article.module.css";

export default function Article({ article }) {
  return (
    <Link to={`/menu/articles/${article.id}`} className={styles.buttonArticle}>
      <article className={styles.article}>
        <div className={styles.articleContent}>
          <div>
            <h2>{article.title}</h2>
            <p className={styles.articlePrice}>{formatPrice(article.price)}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
