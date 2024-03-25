import { Link, useNavigate, useNavigation, redirect } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import LoginForm from "./LoginForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

import { login } from "../../query_utils/auth.js";

import uiStyles from "../UI/UI.module.css";

export default function Login() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { isError } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      //queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/menu");
    },
  });

  return (
    <Modal onClose={() => navigate("../")}>
      <LoginForm /*onSubmit={handleSubmit}*/ method="POST">
        {isSubmitting && "Submitting..."}
        {!isSubmitting && (
          <>
            <Link to="../" className={uiStyles.buttonText}>
              Cancel
            </Link>
            <button type="submit" className={uiStyles.button}>
              Login
            </button>
          </>
        )}
      </LoginForm>
      {isError && (
        <ErrorBlock
          title="Failed to login"
          message={
            "Failed to login. Please check your credentials and try again later."
          }
        />
      )}
    </Modal>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  await login(authData);

  return redirect("/menu");
}