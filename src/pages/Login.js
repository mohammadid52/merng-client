import React, { useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import useForm from "../hooks/useForm";
import { LOGIN_USER } from "../utils/graphql";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

const Login = (props) => {
  const context = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: "",
  };
  const { onChange, onSubmit, values, errors, setErrors } = useForm(
    loginUserCallback,
    initialValues
  );
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update: (_, { data: { login: userData } }) => {
      context.login(userData);
      props.history.push("/");
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <div className="page-title">
          <h2>Login</h2>
        </div>
        <Form.Input
          placeholder="Enter a Username..."
          label="Username"
          type="text"
          name="username"
          onChange={onChange}
          value={values.username}
          error={!!errors.username}
        />

        <Form.Input
          placeholder="Enter a Password..."
          label="Password"
          type="password"
          name="password"
          onChange={onChange}
          value={values.password}
          error={!!errors.password}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
