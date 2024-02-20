import React from "react";
import { authedUserSelector } from "../reducers/authedUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store";

const SecureRoute = () => {
  const { id: authedUserId } = useAppSelector(authedUserSelector);
  const prevLocation = useLocation();
  if (!authedUserId) {
    return (
      <Navigate to={`/login?redirectTo=${prevLocation.pathname}`} replace />
    );
  }
  return <Outlet />;
};

export default SecureRoute;
