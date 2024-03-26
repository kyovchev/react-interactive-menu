import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ContentSection from "../UI/ContentSection.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Article from "../Article/Article.jsx";
import ArticlesList from "../Article/ArticlesList.jsx";
import MenuPicker from "../Menu/MenuPicker.jsx";

import { searchArticles } from "../../query_utils/db.js";
import { QUERY_STALE_TIMES } from "../../../config/config.js";

import styles from "./FindArticles.module.css";

export default function FindArticlesSection() {
  const searchElement = useRef();
  const [selectedMenu, setSelectedMenu] = useState();
  const [searchTerm, setSearchTerm] = useState();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["articles", { searchTerm: searchTerm, menu: selectedMenu }],
    queryFn: ({ signal, queryKey }) =>
      searchArticles({ signal, ...queryKey[1] }),
    enabled: selectedMenu !== undefined || searchTerm !== undefined,
    staleTime: QUERY_STALE_TIMES.articles,
  });

  function handleSelectMenu(menu) {
    setSelectedMenu(menu);
  }

  function handleSubmit(article) {
    article.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find articles.</p>;

  if (isLoading) {
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

  return (
    <ContentSection header="Our menu">
      <form onSubmit={handleSubmit} className={styles.search}>
        <div>
          <MenuPicker onSelect={handleSelectMenu} selectedMenu={selectedMenu} />
        </div>
        <p>
          <input
            type="search"
            placeholder="Search articles"
            name="term"
            ref={searchElement}
          />
          <button>Search</button>
        </p>
      </form>
      {content}
    </ContentSection>
  );
}
