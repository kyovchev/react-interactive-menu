import {
  Link,
  redirect,
  useNavigate,
  useParams,
  useSubmit,
  useNavigation,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import ArticleForm from "./ArticleForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

import {
  fetchArticle,
  updateArticle,
  queryClient,
} from "../../query_utils/db.js";
import { tokenLoader } from "../../query_utils/auth.js";

import uiStyles from "../UI/UI.module.css";

export default function EditArticle() {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const submit = useSubmit();
  const params = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ["articles", params.id],
    queryFn: ({ signal }) => fetchArticle({ signal, id: params.id }),
    staleTime: 10000,
  });

  function handleSubmit(formData) {
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load article"
          message={
            error.info?.message ||
            "Failed to load article. Please, check your inputs and try again later."
          }
        />
        <div>
          <Link to="../" className={uiStyles.button}>
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <ArticleForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <span>Sending data...</span>
        ) : (
          <>
            <Link to="../" className={uiStyles.buttonText}>
              Cancel
            </Link>
            <button type="submit" className={uiStyles.button}>
              Update
            </button>
          </>
        )}
      </ArticleForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["articles", params.id],
    queryFn: ({ signal }) => fetchArticle({ signal, id: params.id }),
  });
}

export async function action({ request, params }) {
  const token = tokenLoader();
  const formData = await request.formData();
  const updatedArticleData = Object.fromEntries(formData);
  await updateArticle({ id: params.id, article: updatedArticleData, token });
  await queryClient.invalidateQueries(["articles"]);
  return redirect("../");
}
