import React, { useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import useForm from "../hooks/useForm";
import { REGISTER_USER } from "../utils/graphql";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

const Register = (props) => {
  const context = useContext(AuthContext);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { onChange, onSubmit, values, errors, setErrors } = useForm(
    registerCallback,
    initialValues
  );
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, { data: { register: userData } }) => {
      context.login(userData);
      props.history.push("/");
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerCallback() {
    addUser();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <div className="page-title">
          <h2>Register</h2>
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
          placeholder="Enter a Email..."
          label="Email"
          type="email"
          name="email"
          onChange={onChange}
          value={values.email}
          error={!!errors.email}
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
        <Form.Input
          placeholder="Confirm Password..."
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={onChange}
          value={values.confirmPassword}
          error={!!errors.confirmPassword}
        />
        <Button type="submit" primary>
          Register
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

export default Register;
