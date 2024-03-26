import { Outlet, useRouteLoaderData, Form } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./Header.jsx";
import FindArticlesSection from "./FindArticlesSection.jsx";
import HotOffersSection from "./HotOffersSection.jsx";
import Button from "../UI/Button.jsx";
import CartButton from "../Cart/CartButton.jsx";
import Cart from "../Cart/Cart.jsx";

export default function Home() {
  const token = useRouteLoaderData("root");

  const showCart = useSelector((state) => state.cart.showCart);

  return (
    <>
      <Outlet />
      {showCart && <Cart />}
      <Header>
        {!token && (
          <Button type="link" style="button" to="/menu/login">
            Login
          </Button>
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
        <CartButton />
      </Header>
      <main>
        <HotOffersSection />
        <FindArticlesSection />
      </main>
    </>
  );
}
