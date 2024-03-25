import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import { getTokenDuration } from "../../query_utils/auth.js";

export default function Root() {
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }

    const tokenDuration = getTokenDuration();

    const timeout = setTimeout(() => {
      submit(null, { action: "/menu/logout", method: "post" });
    }, tokenDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, [token, submit]);

  return <Outlet />;
}
