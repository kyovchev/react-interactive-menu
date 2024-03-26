import styles from "./ArticlesList.module.css";

export default function ArticlesList({ children }) {
  return <ul className={styles.articlesList}>{children}</ul>;
}
