import { FIREBASE_REALTIME_DB_URL } from "../../config/config.js";

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchLatestArticles({ signal, max }) {
  let url = `${FIREBASE_REALTIME_DB_URL}/articles.json`;

  if (max) {
    url += '?orderBy="$key"&limitToLast=' + max;
  }

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the articles");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  let articles = await response.json();
  if (!articles) {
    return null;
  }
  articles = Object.keys(articles).map((key) => ({
    ...articles[key],
    id: key,
  }));

  return articles;
}

export async function searchArticles({ signal, searchTerm, menu }) {
  let url = `${FIREBASE_REALTIME_DB_URL}/articles.json`;

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the articles");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  let articles = await response.json();
  articles = Object.keys(articles).map((key) => ({
    ...articles[key],
    id: key,
  }));
  if (menu) articles = articles.filter((item) => item.menu == menu);
  if (searchTerm)
    articles = articles.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );
  return articles;
}

export async function createNewArticle({ article, token }) {
  const response = await fetch(
    `${FIREBASE_REALTIME_DB_URL}/articles.json?auth=${token}`,
    {
      method: "POST",
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while creating the article");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { articleData } = await response.json();

  return articleData;
}

export async function fetchMenus({ signal }) {
  const response = await fetch(`${FIREBASE_REALTIME_DB_URL}/menus.json`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const menus = await response.json();

  return menus;
}

export async function fetchArticle({ id, signal }) {
  const response = await fetch(
    `${FIREBASE_REALTIME_DB_URL}/articles/${id}.json`,
    {
      signal,
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the article");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const article = await response.json();

  return article;
}

export async function deleteArticle({ id, token }) {
  const response = await fetch(
    `${FIREBASE_REALTIME_DB_URL}/articles/${id}.json?auth=${token}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the article");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function updateArticle({ id, article, token }) {
  const response = await fetch(
    `${FIREBASE_REALTIME_DB_URL}/articles/${id}.json?auth=${token}`,
    {
      method: "PUT",
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while updating the article");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
