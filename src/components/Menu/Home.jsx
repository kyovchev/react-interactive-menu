import { Link, Outlet, useRouteLoaderData, Form } from "react-router-dom";

import Header from "./Header.jsx";
import FindArticlesSection from "./FindArticlesSection.jsx";
import HotOffersSection from "./HotOffersSection.jsx";

import uiStyles from "../UI/UI.module.css";

export default function Home() {
  const token = useRouteLoaderData("root");

  return (
    <>
      <Outlet />
      <Header>
        {!token && (
          <Link to="/menu/login" className={uiStyles.button}>
            Login
          </Link>
        )}
        {token && (
          <>
            <Form action="/menu/logout" method="post">
              <button className={uiStyles.button}>Logout</button>
            </Form>
            <Link to="/menu/articles/new" className={uiStyles.button}>
              New Article
            </Link>
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
