import { useNavigate, Link } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

import uiStyles from "../UI/UI.module.css";

export default function NotFoundBoundary() {
  const navigate = useNavigate();

  return (
    <Modal
      onClose={() => {
        navigate("/menu");
        return true;
      }}
    >
      <ErrorBlock title="An error occured!" message={"Page not found!"} />
      <Link to="/menu" className={`center ${uiStyles.button}`}>
        Go to Home
      </Link>
    </Modal>
  );
}
