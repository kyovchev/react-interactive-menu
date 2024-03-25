import { useNavigate, useRouteError, Link } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

import uiStyles from "../UI/UI.module.css";

export default function AuthErrorBoundary() {
  let error = useRouteError();
  const navigate = useNavigate();

  return (
    <Modal
      onClose={() => {
        navigate("/menu");
        return true;
      }}
    >
      <ErrorBlock
        title="An error occured!"
        message={
          error.info?.error || error.info?.message
            ? "Invalid credentials!"
            : "Connection failed! Please, try again later."
        }
      />
      <Link to="/menu" className={`center ${uiStyles.button}`}>
        Dismiss
      </Link>
    </Modal>
  );
}
