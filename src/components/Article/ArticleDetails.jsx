import { useState, useLayoutEffect } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import Header from "../Menu/Header.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";

import {
  fetchArticle,
  deleteArticle,
  queryClient,
} from "../../query_utils/db.js";
import { QUERY_STALE_TIMES } from "../../../config/config.js";
import { formatPrice } from "../../utils/formatters.js";

import uiStyles from "../UI/UI.module.css";
import styles from "./ArticleDetails.module.css";

export default function ArticleDetails() {
  useLayoutEffect(() => window.scrollTo(0, 0), []);

  const [isDeleting, setIsDeleting] = useState(false);

  const token = useRouteLoaderData("root");

  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["articles", params.id],
    queryFn: ({ signal }) => fetchArticle({ signal, id: params.id }),
    staleTime: QUERY_STALE_TIMES.articles,
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
        refetchType: "none",
      });
      navigate("/menu");
    },
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDelete() {
    mutate({ id: params.id, token });
  }

  let content;

  if (isPending) {
    content = (
      <div className={styles.content}>
        <p>Fetching article data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div className={styles.content}>
        <ErrorBlock
          title="Failed to load article"
          message={
            error.info?.message ||
            "Failed to fetch article data, please try again later."
          }
        />
      </div>
    );
  }

  if (data) {
    content = (
      <>
        <header>
          <nav>
            <button
              className={uiStyles.button}
              onClick={() => navigate("/menu")}
            >
              Back
            </button>
            {token && (
              <>
                <button
                  onClick={handleStartDelete}
                  className={uiStyles.buttonText}
                >
                  Delete
                </button>
                <Link to="edit" className={uiStyles.buttonText}>
                  Edit
                </Link>
              </>
            )}
          </nav>
        </header>
        <div className={styles.content}>
          <div className={styles.info}>
            <h1>{data.title}</h1>
            <div>
              <p className={styles.price}>{formatPrice(data.price)}</p>
            </div>
            <p className={styles.description}>{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this article? This action cannot be
            undone.
          </p>
          <div className={uiStyles.formAction}>
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {!isPendingDeletion && (
              <>
                <button
                  onClick={handleStopDelete}
                  className={uiStyles.buttonText}
                >
                  Cancel
                </button>
                <button onClick={handleDelete} className={uiStyles.button}>
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock
              title="Failed to delete article"
              message={
                deleteError.info?.message ||
                "Failed to delete article, please try again later."
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/menu" className={uiStyles.button}>
          Home
        </Link>
      </Header>
      <article className={styles.details}>{content}</article>
    </>
  );
}
