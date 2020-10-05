import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";
const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
      {...rest}
    />
  );
};

export default AuthRoute;
