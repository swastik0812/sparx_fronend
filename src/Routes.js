import React, { Component } from "react";
import * as actionType from "./action";

import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import { Form, Contacts, Signin } from "./app/containers";

class Main extends Component {
  // setToken = (data) => {
  //   this.setState({ token: data });
  // };

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Form setToken={this.props.SetToken} />}
          />
          <Route exact path="/Contacts" component={Contacts} />
          <Route exact path="/Signin" component={Signin} />
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Route.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetToken: (tokenValue) => {
      dispatch({ type: actionType.SetToken, value: tokenValue });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
