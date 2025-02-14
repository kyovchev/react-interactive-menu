import { Outlet, useRouteLoaderData, Form } from "react-router-dom";

import Header from "../components/UI/Header.jsx";
import FindArticlesSection from "../components/Menu/FindArticlesSection.jsx";
import HotOffersSection from "../components/Menu/HotOffersSection.jsx";
import Button from "../components/UI/Button.jsx";

import styles from "./Menu.module.css";

export default function MenuPage() {
  const token = useRouteLoaderData("root");

  return (
    <>
      <Outlet />
      <Header>
        {!token && (
          <div className={styles.button}>
            <Button type="link" style="button" to="/menu/login">
              Login
            </Button>
          </div>
        )}
        {token && (
          <>
            <Form action="/menu/logout" method="post">
              <Button type="submit" style="button">
                Logout
              </Button>
            </Form>
            <Button type="link" style="button" to="/menu/articles/new">
              New Article
            </Button>
          </>
        )}
      </Header>
      <main>
        <HotOffersSection />
        <FindArticlesSection />
      </main>
    </>
  );
}
