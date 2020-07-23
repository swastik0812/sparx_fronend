import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import EditContact from "./editContact/editContact";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ContactList = (props) => {
  const [edit, setEdit] = useState(false);
  const [editId, setEditID] = useState("");

  const editContact = (id) => {
    setEdit(true);
    setEditID(id);
  };

  const dontEdit = () => {
    setEdit(false);
  };

  function renderRow(props) {
    const { index, style, data } = props;
    return (
      <ListItem button style={style} key={index}>
        <ListItemText
          style={{ color: "blue" }}
          primary={data[index].name}
          secondary={data[index].number + " edit"}
          onClick={() => editContact(data[index]._id)}
        />
      </ListItem>
    );
  }

  const classes = useStyles();

  return (
    <div className={classes.root} style={{ marginTop: "113px" }}>
      <div style={{ backgroundColor: "#bcddec", width: "350px" }}>
        <h3 style={{ color: "grey", marginTop: "-70px" }}>
          YOUR TOTAL CONTACTS : {props.data.length}
        </h3>
      </div>
      <FixedSizeList
        height={400}
        width={350}
        itemSize={60}
        style={{ backgroundColor: "#f2f7ea", marginTop: "-20px" }}
        itemCount={props.data.length}
        itemData={props.data}
      >
        {renderRow}
      </FixedSizeList>
      {edit ? (
        <EditContact Id={editId} fetchList={props.fetchList} show={dontEdit} />
      ) : null}
    </div>
  );
};

export default ContactList;
