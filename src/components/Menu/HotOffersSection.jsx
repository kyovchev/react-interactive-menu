import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Article from "../Article/Article.jsx";

import { fetchLatestArticles } from "../../query_utils/db.js";
import { QUERY_STALE_TIMES } from "../../../config/config.js";

import uiStyles from "../UI/UI.module.css";

export default function HotOffersSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["articles", { max: 3 }],
    queryFn: ({ signal, queryKey }) =>
      fetchLatestArticles({ signal, ...queryKey[1] }),
    staleTime: QUERY_STALE_TIMES.articles,
    // gcTime: 1000
  });

  let content = <p>There are no hot offers at this moment.</p>;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch articles."}
      />
    );
  }

  if (data) {
    content = (
      <ul className={uiStyles.articlesList}>
        {data.map((article) => (
          <li key={article.id}>
            <Article article={article} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className={uiStyles.contentSection}>
      <header>
        <h2>Hot offers</h2>
      </header>
      {content}
    </section>
  );
}
