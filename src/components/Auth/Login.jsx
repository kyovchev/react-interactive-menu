import { useNavigate, useNavigation, redirect } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import LoginForm from "./LoginForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Button from "../UI/Button.jsx";

import { login } from "../../query_utils/auth.js";

export default function Login() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { isError } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/menu");
    },
  });

  return (
    <Modal onClose={() => navigate("../")}>
      <LoginForm method="POST">
        {isSubmitting && "Submitting..."}
        {!isSubmitting && (
          <>
            <Button type="link" style="text" to="../">
              Cancel
            </Button>
            <Button type="submit" style="button">
              Login
            </Button>
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
