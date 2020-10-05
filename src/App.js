import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Container>
            <MenuBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/register" component={Register} />
              <AuthRoute exact path="/login" component={Login} />
              <Route exact path="/posts/:postId" component={SinglePost} />
            </Switch>
          </Container>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
