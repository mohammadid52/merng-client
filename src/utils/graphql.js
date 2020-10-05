import gql from "graphql-tag";
export const FETCH_ALL_POSTS = gql`
  {
    getPosts {
      id
      username
      createdAt
      body
      likeCount
      commentCount
      likes {
        id
        createdAt
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      token
      email
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
      createdAt
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      createdAt
      username
      likeCount
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const SINGLE_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      body
      createdAt
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        username
        createdAt
        id
      }
      commentCount
      likeCount
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      body
      username
      createdAt
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
      likeCount
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const CREATE_COMMENT_POST = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      commentCount
      username
      comments {
        id
        username
        body
        createdAt
      }
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;
