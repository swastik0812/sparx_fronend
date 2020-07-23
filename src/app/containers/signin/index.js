import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import axios from "axios";
import { Formik } from "formik";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionType from "../../../action";

const initialValues = {
  email: "",
  password: null,
};

class Signin extends Component {
  validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 7) {
      errors.password = "To short Password";
    } else if (values.password.length > 20) {
      errors.password = "To Big password";
    }

    return errors;
  };

  onSubmit = async (formData) => {
    try {
      const data = {
        ...formData,
      };

      await axios
        .post("http://localhost:3000/users/", data)
        .then((response) => {
          this.props.SetToken(response.data.token);
          this.props.history.push("/contacts");
        })
        .catch((error) => {
          console.log(error);
        });
      //  await props.setToken(apiResponse.data.token);
    } catch (error) {
      alert("It seems we had some issue, please try again!");
      console.log({ error });
    }
  };

  render() {
    console.log(this.props);
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{ paddingTop: 100 }}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Formik
            validate={this.validate}
            initialValues={initialValues}
            onSubmit={this.onSubmit}
          >
            {(formikProps) => {
              const {
                values,
                errors,
                handleChange,
                handleBlur,
                touched,
              } = formikProps;

              return (
                <form onSubmit={formikProps.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email && touched.email}
                        helperText={
                          errors.email && touched.email
                            ? errors.email
                            : undefined
                        }
                        inputProps={{
                          maxLength: 100,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.password && touched.password}
                        helperText={
                          errors.password && touched.password
                            ? errors.password
                            : undefined
                        }
                        inputProps={{
                          maxLength: 100,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    style={{ marginTop: 20 }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={formikProps.isSubmitting}
                  >
                    SUBMIT
                  </Button>
                </form>
              );
            }}
          </Formik>
        </div>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
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

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
