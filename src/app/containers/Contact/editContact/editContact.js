import React, { Component } from "react";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    number: "",
  };

  setName = (data) => {
    this.setState({ name: data });
  };
  setNumber = (data) => {
    this.setState({ number: data });
  };

  updateContact = () => {
    const data = {
      name: this.state.name,
      number: this.state.number,
    };
    try {
      axios
        .patch(
          "http://localhost:3000/contacts/" + this.props.Id,
          { name: data.name, number: data.number },
          {
            headers: {
              //   "Content-Type":
              //     "application/x-www-form-urlencoded; charset=UTF-8",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.setState({ name: "", number: "" });
          this.props.show(false);
          this.props.fetchList();
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  deleteContact = () => {
    try {
      axios
        .delete("http://localhost:3000/contacts/" + this.props.Id, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.setState({ name: "", number: "" });
          this.props.show();
          this.props.fetchList();

          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    try {
      axios
        .get("http://localhost:3000/contacts/" + this.props.Id, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) =>
          this.setState({ name: res.data.name, number: res.data.number })
        )
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div
        style={{
          marginTop: "20px",
          backgroundColor: "#cde2b6",
          width: "350px",
          marginBottom: "100px",
        }}
      >
        <div style={{ color: "blue" }}>Update Name</div>
        <input
          type="text"
          value={this.state.name}
          onChange={(event) => this.setName(event.target.value)}
        ></input>
        <div style={{ color: "blue" }}>Update Number</div>
        <input
          type="text"
          value={this.state.number}
          onChange={(event) => this.setNumber(event.target.value)}
        ></input>
        <button
          style={{ height: "25px", width: "60px", marginLeft: "10px" }}
          onClick={this.updateContact}
        >
          Update
        </button>
        <button
          style={{ height: "25px", width: "60px" }}
          onClick={this.deleteContact}
        >
          {" "}
          Delete
        </button>
      </div>
    );
  }
}

export default EditContact;
