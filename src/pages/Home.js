import React, { useContext } from "react";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_POSTS } from "../utils/graphql";
import { AuthContext } from "../context/auth";
import { CircleLoader } from "react-spinners";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_ALL_POSTS);
  if (loading) {
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
  const posts = data.getPosts;
  return (
    <Grid columns={4}>
      <Grid.Row className="page-title">
        <h2>Recent Posts</h2>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        <Transition.Group animation="jiggle" duration={500}>
          {posts &&
            posts.map((post) => (
              <Grid.Column key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
