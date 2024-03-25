import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import ArticleForm from "./ArticleForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

import { createNewArticle, queryClient } from "../../query_utils/db.js";

import uiStyles from "../UI/UI.module.css";

export default function NewArticle() {
  const navigate = useNavigate();
  const token = useRouteLoaderData("root");
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      navigate("/menu");
    },
  });

  function handleSubmit(formData) {
    mutate({ article: formData, token });
  }

  return (
    <Modal onClose={() => navigate("/menu")}>
      <ArticleForm onSubmit={handleSubmit}>
        {isPending && "Submitting..."}
        {!isPending && (
          <>
            <Link to="/menu" className={uiStyles.buttonText}>
              Cancel
            </Link>
            <button type="submit" className={uiStyles.button}>
              Create
            </button>
          </>
        )}
      </ArticleForm>
      {isError && (
        <ErrorBlock
          title="Failed to create article"
          message={
            error.info?.message ||
            error.info?.error ||
            "Failed to create article. Please check your inputs and try again later."
          }
        />
      )}
    </Modal>
  );
}
