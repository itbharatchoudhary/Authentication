import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../Components/ErrorMessage.jsx";
import { ROUTES } from "../../../Utils/Constants.js";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <ErrorMessage
      code="404"
      title="Story not found."
      message="The page you're looking for has been removed or never existed. Check the URL or head back to safety."
      onAction={() => navigate(ROUTES.LANDING)}
      actionLabel="← Back Home"
    />
  );
}
