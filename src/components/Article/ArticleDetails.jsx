import { useState, useLayoutEffect } from "react";
import {
  Outlet,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import Header from "../Menu/Header.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";
import Button from "../UI/Button.jsx";
import { FormActions } from "../UI/Form.jsx";

import {
  fetchArticle,
  deleteArticle,
  queryClient,
} from "../../query_utils/db.js";
import { QUERY_STALE_TIMES } from "../../../config/config.js";
import { formatPrice } from "../../utils/formatters.js";

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
            <Button
              type="button"
              style="button"
              onClick={() => navigate("/menu")}
            >
              Back
            </Button>
            {token && (
              <>
                <Button type="button" style="text" onClick={handleStartDelete}>
                  Delete
                </Button>
                <Button type="link" style="text" to="edit">
                  Edit
                </Button>
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
          <FormActions>
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {!isPendingDeletion && (
              <>
                <Button type="button" style="text" onClick={handleStopDelete}>
                  Cancel
                </Button>
                <Button type="button" style="text" onClick={handleDelete}>
                  Delete
                </Button>
              </>
            )}
          </FormActions>
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
        <Button type="link" style="button" to="/menu">
          Home
        </Button>
      </Header>
      <article className={styles.details}>{content}</article>
    </>
  );
}
