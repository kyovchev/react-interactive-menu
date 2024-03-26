import { useQuery } from "@tanstack/react-query";

import ContentSection from "../UI/ContentSection.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Article from "../Article/Article.jsx";
import ArticlesList from "../Article/ArticlesList.jsx";

import { fetchLatestArticles } from "../../query_utils/db.js";
import { QUERY_STALE_TIMES } from "../../../config/config.js";

export default function HotOffersSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["articles", { max: 3 }],
    queryFn: ({ signal, queryKey }) =>
      fetchLatestArticles({ signal, ...queryKey[1] }),
    staleTime: QUERY_STALE_TIMES.articles,
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
      <ArticlesList>
        {data.map((article) => (
          <li key={article.id}>
            <Article article={article} />
          </li>
        ))}
      </ArticlesList>
    );
  }

  return <ContentSection header="Hot Offers">{content}</ContentSection>;
}
