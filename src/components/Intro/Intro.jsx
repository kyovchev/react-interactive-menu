import { Link } from "react-router-dom";

import introImage from "../../assets/intro.jpg";

import styles from "./Intro.module.css";
import uiStyles from "../UI/UI.module.css";

export default function Intro() {
  return (
    <section
      className={styles.contentSection}
      id="overview-section"
      style={{ backgroundImage: `url(${introImage})` }}
    >
      <div>
        <h2>
          This a demo React app implementing an{" "}
          <strong>online interactive menu.</strong>
        </h2>
        <p>
          The source code and more implementation details can be found on{" "}
          <a
            href="https://github.com/kyovchev/react-interactive-menu"
            target="_blank"
          >
            GitHub
          </a>
          .
        </p>
        <p>&nbsp;</p>
        <p>
          All of the photos used are taken from{" "}
          <a href="https://www.pexels.com/" target="_blank">
            https://www.pexels.com/
          </a>
          .
        </p>
        <p>&nbsp;</p>
        <p>
          <Link to="/menu" className={uiStyles.button}>
            Open Our Interactive Menu
          </Link>
        </p>
      </div>
    </section>
  );
}
