import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../Components/ErrorMessage.jsx";
import { ROUTES } from "../../../Utils/Constants.js";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <ErrorMessage
      code="401"
      title="Access denied."
      message="You don't have permission to view this page. Sign in with the right account to continue."
      onAction={() => navigate(ROUTES.LOGIN)}
      actionLabel="Sign In"
    />
  );
}
