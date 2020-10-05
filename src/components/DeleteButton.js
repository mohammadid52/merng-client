import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import MyPopup from "./MyPopup";
import { useMutation } from "@apollo/react-hooks";
import {
  DELETE_POST_MUTATION,
  FETCH_ALL_POSTS,
  DELETE_COMMENT_MUTATION,
} from "../utils/graphql";

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const refetch = () => {
    if (!commentId) {
      return [{ query: FETCH_ALL_POSTS }];
    } else return null;
  };
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrComment] = useMutation(mutation, {
    update: (proxy) => {
      setConfirmOpen(false);
      if (callback) callback();
    },
    refetchQueries: () => refetch(),
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <>
      <MyPopup content="Delete this thought" position="bottom center">
        <Button
          icon
          floated="right"
          basic
          color="red"
          size="small"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" />
        </Button>
      </MyPopup>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
};

export default DeleteButton;
