import React, { useContext } from "react";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import randomImage from "./ImageCollections";
import DeleteButton from "./DeleteButton";
import MyPopup from "./MyPopup";

const PostCard = ({
  post: {
    id,
    username,
    likeCount,
    likes,
    comments,
    commentCount,
    createdAt,
    body,
  },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Card className="card-body">
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="right"
          size="mini"
          src={randomImage || "https://pbs.twimg.com/media/EFsqx6YXUAELRTu.png"}
        />
        <MyPopup
          wide
          content={`${username}: The creator of this post`}
          position="bottom left"
        >
          <Card.Header>{username}</Card.Header>
        </MyPopup>

        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopup
          content={
            commentCount > 0
              ? `${commentCount} comments on this thought`
              : "comment this thought"
          }
          position="bottom center"
        >
          <Button as="div" labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="green" basic size="small">
              <Icon name="comments" />
            </Button>
            <Label basic color="green" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
