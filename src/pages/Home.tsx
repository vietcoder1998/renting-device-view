import React from "react";
import { Link, useParams } from "react-router-dom";
import { loadUser } from "../api/auth";

export default function Home() {
  const params = useParams();

  return (
    <>
      <Link to={"/sign-in"}>SignIn</Link>
    </>
  );
}
