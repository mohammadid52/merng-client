import { LIKE_POST_MUTATION } from "../utils/graphql";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button, Label, Icon } from "semantic-ui-react";
import MyPopup from "./MyPopup";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost, { loading }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="blue" loading={loading ? true : false}>
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="blue" basic loading={loading ? true : false}>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button
      as={Link}
      to="/login"
      color="blue"
      basic
      loading={loading ? true : false}
    >
      <Icon name="heart" />
    </Button>
  );

  return (
    <MyPopup
      content={
        likeCount > 0
          ? `${likeCount} people liked this thought`
          : "like this thought"
      }
      position="bottom center"
    >
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}

        <Label basic color="blue" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
  );
}

export default LikeButton;
