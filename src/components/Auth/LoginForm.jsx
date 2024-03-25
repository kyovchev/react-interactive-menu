import { Form } from "react-router-dom";

import uiStyles from "../UI/UI.module.css";

export default function LoginForm({ inputData, children }) {
  return (
    <Form className={uiStyles.form} action="/menu/login" method="POST">
      <p>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          defaultValue={inputData?.email ?? ""}
        />
      </p>

      <p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue={inputData?.password ?? ""}
        />
      </p>

      <p className={uiStyles.formActions}>{children}</p>
    </Form>
  );
}
