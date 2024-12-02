import React, { useState, useEffect } from "react";
import { SignInError } from "../types/signin";
import { SignInErrorProptype } from "../protypes/signin";
import { loginUser } from "../api/auth";
import { saveToken } from "../cook";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<SignInError>({
    $invalid: false,
    $incorrect: false,
    $server: false,
  });
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    // Fetch contact email from API
    fetch("/auth/contact")
      .then((response) => response.json())
      .then((data) => setContactEmail(data.contact.email))
      .catch((err) => console.error("Error fetching contact email:", err));
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      name: username,
      email: password,
      directUrl: "http://localhost:3000",
    };

    setError(SignInErrorProptype); // Reset error before submitting

    loginUser(data)
      .then((responseData) => {
        console.log("🚀 ~ .then ~ responseData:", responseData)
        if (responseData.redirect) {
          window.location.replace(responseData.redirect);
        }

        saveToken(responseData.token)
      })
      .catch((response) => {
        switch (response.error) {
          case "ValidationError":
            setError({ $invalid: true });
            break;
          case "InvalidCredentialsError":
            setError({ $incorrect: true });
            break;
          default:
            setError({ $server: true });
            break;
        }
      });
  };

  const handleMailToSupport = () => {
    window.location.href = `mailto:${contactEmail}`;
  };

  return (
    <div>
      Sample name: administrator email: administrator@fakedomain.com
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && error.$incorrect && (
          <p style={{ color: "red" }}>Invalid credentials. Please try again.</p>
        )}
        {error && error.$invalid && (
          <p style={{ color: "red" }}>Please check your inputs.</p>
        )}
        {error && error.$server && (
          <p style={{ color: "red" }}>
            An error occurred. Please try again later.
          </p>
        )}
        <button type="submit">Sign In</button>
      </form>
      <button onClick={handleMailToSupport}>Contact Support</button>
    </div>
  );
};

export default SignIn;
