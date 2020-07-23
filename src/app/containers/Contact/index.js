import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionType from "./action";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ContactList from "./contactList";

import axios from "axios";

class Contact extends Component {
  fetchData = () => {
    try {
      axios
        .get("http://localhost:3000/contacts/", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => this.props.SetContact(res.data))
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    // localStorage.setItem("token", this.props.token);
    this.fetchData();
  }

  Logout = () => {
    try {
      axios
        .post("http://localhost:3000/users/logout/", "", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          localStorage.removeItem("token");
          this.props.history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  addContact = () => {
    const data = {
      name: this.props.name,
      number: this.props.number,
    };

    try {
      axios
        .post("http://localhost:3000/contacts/", data, {
          headers: {
            // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.fetchData();
          this.props.SetName("Name");
          this.props.SetNumber("Number");
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "220px",
            marginLeft: "33px",
          }}
        >
          <div>
            <div>ADD Contact</div>
            <input
              onChange={(event) => this.props.SetName(event.target.value)}
              value={this.props.name}
              type="text"
            ></input>
            <input
              style={{ marginTop: "10px" }}
              onChange={(event) => this.props.SetNumber(event.target.value)}
              value={this.props.number}
              type="text"
            ></input>
            <button
              style={{ height: "22px", marginTop: "10px", width: "50px" }}
              onClick={this.addContact}
            >
              ADD
            </button>
          </div>
          <div style={{ marginLeft: "75px" }} onClick={this.Logout}>
            Logout
          </div>
        </div>
        <div>
          {this.props.contact ? (
            <ContactList data={this.props.contact} fetchList={this.fetchData} />
          ) : null}
        </div>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Route.token,
    contact: state.Contact.contacts,
    name: state.Contact.name,
    number: state.Contact.number,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetContact: (Contacts) => {
      dispatch({ type: actionType.SetContacts, value: Contacts });
    },
    SetName: (name) => {
      dispatch({ type: actionType.SetName, value: name });
    },
    SetNumber: (number) => {
      dispatch({ type: actionType.SetNumber, value: number });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
