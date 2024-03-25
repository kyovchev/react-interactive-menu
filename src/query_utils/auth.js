import { redirect } from "react-router-dom";

import { FIREBASE_API_KEY } from "../../config/config.js";

export async function login({ email, password }) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while login");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const login = await response.json();

  localStorage.setItem("token", login.idToken);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("token_expiration", expiration.toISOString());

  redirect("/menu");
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("token_expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiration");
    return null;
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}
