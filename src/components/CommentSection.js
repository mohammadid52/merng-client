import React, { useContext } from "react";
import { Card, Transition } from "semantic-ui-react";
import moment from "moment";
import DeleteButton from "./DeleteButton";
import { AuthContext } from "../context/auth";

const CommentSection = ({
  postId,
  comment: { id, username, body, createdAt },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Transition.Group animation="fade" duration={500}>
      <Card fluid className="comment-body">
        <Card.Content>
          <Card.Header>{username}</Card.Header>
          <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
          <Card.Description>{body}</Card.Description>
          {user && user.username === username && (
            <DeleteButton postId={postId} commentId={id} />
          )}
        </Card.Content>
      </Card>
    </Transition.Group>
  );
};

export default CommentSection;
