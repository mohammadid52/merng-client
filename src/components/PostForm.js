import React from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import useForm from "../hooks/useForm";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_POST, FETCH_ALL_POSTS } from "../utils/graphql";

const PostForm = () => {
  const { onChange, onSubmit, values, errors, setErrors } = useForm(
    createPostCallback,
    {
      body: "",
    }
  );

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: values,
    refetchQueries: (refetchPosts) => [{ query: FETCH_ALL_POSTS }],
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <Form onSubmit={onSubmit}>
      <h2>Create Post:</h2>
      <Form.Input
        type="text"
        label={errors.body ? errors.body : ""}
        placeholder={"Hello World!!"}
        onChange={onChange}
        name="body"
        values={values.body}
        error={!!errors.body}
      />

      <Button
        animated
        basic
        color="green"
        fluid
        loading={loading ? true : false}
      >
        <Button.Content visible>Submit</Button.Content>
        <Button.Content hidden>
          <Icon name="send" />
        </Button.Content>
      </Button>
    </Form>
  );
};

export default PostForm;
