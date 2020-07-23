import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { DatePicker } from "@material-ui/pickers";
import useStyles from "./useStyles";
import moment from "moment";
import axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as _ from "lodash";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: null,
};

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
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

export default function SignUp(props) {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (formData) => {
    try {
      const data = {
        ...formData,
      };

      setLoading(true);
      await axios
        .post("http://localhost:3000/users/login/", data)
        .then((response) => {
          if (response.data === "please Sign in first") {
            alert("Its seems you don't have any account please Sign in first");
          } else {
            localStorage.setItem("token", response.data.token);
            props.setToken(response.data.token);
            history.push("/contacts");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error.response);
      alert("It seems we had some issue, please try again!");
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Welcome!
        </Typography>
        <Formik
          validate={validate}
          initialValues={initialValues}
          onSubmit={onSubmit}
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
              <form
                className={classes.form}
                onSubmit={formikProps.handleSubmit}
              >
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
                        errors.email && touched.email ? errors.email : undefined
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
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={formikProps.isSubmitting}
                >
                  SUBMIT
                </Button>
              </form>
            );
          }}
        </Formik>
        <Grid container>
          <Grid item xs>
            <Link to="/Signin">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
