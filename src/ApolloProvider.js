import React from "react";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./App";
import { setContext } from "apollo-link-context";

const token = localStorage.getItem("jwtToken");
const httpLink = createHttpLink({
  uri: "http://localhost:8080",
});

const setAuthLink = setContext(() => {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: setAuthLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
