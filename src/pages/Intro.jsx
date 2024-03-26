import Button from "../components/UI/Button.jsx";

import introImage from "../assets/intro.jpg";

import styles from "./Intro.module.css";

export default function IntroPage() {
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
            Pexels
          </a>
          .
        </p>
        <p>&nbsp;</p>
        <p>
          <Button type="link" style="button" to="/menu">
            Open Menu
          </Button>
        </p>
      </div>
    </section>
  );
}
