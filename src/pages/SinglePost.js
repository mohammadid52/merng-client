import React, { useContext, useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { SINGLE_POST_QUERY, CREATE_COMMENT_POST } from "../utils/graphql";
import { CircleLoader } from "react-spinners";
import {
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Form,
} from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import CommentSection from "../components/CommentSection";
import moment from "moment";
import randomImage from "../components/ImageCollections";

const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const commentRef = useRef(null);

  const [comment, setComment] = useState("");

  const { data, loading: postLoader } = useQuery(SINGLE_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [createComment, { loading: commentLoader }] = useMutation(
    CREATE_COMMENT_POST,
    {
      update: () => {
        setComment("");
        commentRef.current.blur();
      },
      variables: {
        postId,
        body: comment,
      },
    }
  );

  function deletePostCallback() {
    props.history.push("/");
  }
  if (postLoader) {
    return (
      <CircleLoader
        color={"#66C768"}
        width="100%"
        size={50}
        css={{
          display: "block",
          margin: "0 auto",
          marginTop: "100px",
        }}
      />
    );
  }

  const {
    id,
    body,
    username,
    commentCount,
    comments,
    likeCount,
    likes,
    createdAt,
  } = data.getPost;

  const postMarkup = (
    <Grid
      style={{
        marginTop: "20px",
      }}
    >
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src={
              randomImage ||
              "https://i.pinimg.com/originals/55/7a/ee/557aee3ce530f6ae193cdb08a384ad3c.jpg"
            }
            size="small"
            floated="right"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid className="fixed__card">
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <LikeButton user={user} post={{ id, likeCount, likes }} />
              <Button as="div" labelPosition="right">
                <Button color="green" basic>
                  <Icon name="comments" />
                </Button>
                <Label basic color="green" pointing="left">
                  {commentCount}
                </Label>
              </Button>
              {user && user.username === username && (
                <DeleteButton postId={id} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid className="fixed__card">
              <Card.Content>
                <p>Post a comment:</p>
                <Form>
                  <div className="ui input fluid action">
                    <input
                      type="text"
                      placeholder="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      ref={commentRef}
                    />
                    <Button
                      type="submit"
                      disabled={comment.trim() === ""}
                      onClick={createComment}
                      className="ui button blue"
                      loading={commentLoader ? true : false}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}

          {/* Comment Section */}
          {comments.map((comment) => (
            <CommentSection key={comment.id} comment={comment} postId={id} />
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  return postMarkup;
};

export default SinglePost;
