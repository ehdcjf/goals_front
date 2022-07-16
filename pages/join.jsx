import DefaultLayout from "../layout/Default";
// ** React Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserJoinRequest } from "../reducers/user";
import Router from "next/router";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";

// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

const FormLayoutsBasic = () => {
  // ** States
  const dispatch = useDispatch();
  const { IsLogin, user, loading } = useSelector((state) => state.user);
  const [values, setValues] = useState({
    id: "",
    idError: false,
    idHelperText: "",
    name: "",
    nameError: false,
    nameHelperText: "",
    password: "",
    passwordError: false,
    passwordHelperText: "",
    showPassword: false,
    confirmPassword: "",
    confirmPasswordError: false,
    confirmPasswordHelperText: "",
    showConfirmPassword: false,
  });

  const handleJoin = () => {
    if (values.id == "") {
      setValues({ ...values, idError: true, idHelperText: "ID is empty." });
      return alert("ID is empty.");
    }

    if (values.name == "") {
      setValues({
        ...values,
        nameError: true,
        nameHelperText: "Name is an empty value.",
      });
      return alert("Name is an empty value.");
    }

    if (values.password == "") {
      setValues({
        ...values,
        passwordError: true,
        passwordHelperText: "Password is an empty value.",
      });
      return alert("Password is an empty value.");
    }

    if (values.password != values.confirmPassword) {
      setValues({
        ...values,
        confirmPasswordError: true,
        confirmPasswordHelperText: "Please confirm your password",
      });
      return alert("Please confirm your password");
    }
    const data = {
      id: values.id,
      name: values.name,
      pw: values.password,
    };
    dispatch(UserJoinRequest(data));
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickConfirmPassShow = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (values.idError && values.id != "") {
      setValues({ ...values, idError: false, idHelperText: "" });
    }

    if (values.nameError && values.name != "") {
      setValues({ ...values, nameError: false, nameHelperText: "" });
    }

    if (values.passwordError && values.password != "") {
      setValues({ ...values, passwordError: false, passwordHelperText: "" });
    }

    if (
      values.confirmPasswordError &&
      values.password == values.confirmPassword
    ) {
      setValues({
        ...values,
        confirmPasswordError: false,
        confirmPasswordHelperText: "",
      });
    }
  }, [values]);

  useEffect(() => {
    if (IsLogin) {
      Router.push(`/`);
    }
  }, [IsLogin]);

  return (
    <Card>
      <CardHeader title="Join" titleTypographyProps={{ variant: "h6" }} />
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                error={values.idError}
                onChange={handleChange("id")}
                fullWidth
                label="ID"
                placeholder="ID"
                value={values.id}
                helperText={values.idHelperText}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="Name"
                label="Name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange("name")}
                error={values.nameError}
                helperText={values.nameHelperText}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="form-layouts-basic-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  label="Password"
                  error={values.passwordError}
                  value={values.password}
                  id="form-layouts-basic-password"
                  onChange={handleChange("password")}
                  type={values.showPassword ? "text" : "password"}
                  aria-describedby="form-layouts-basic-password-helper"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label="toggle password visibility"
                      >
                        {values.showPassword ? (
                          <EyeOutline />
                        ) : (
                          <EyeOffOutline />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="form-layouts-basic-password-helper">
                  {values.passwordHelperText}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="form-layouts-confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  label="Confirm Password"
                  value={values.confirmPassword}
                  error={values.confirmPasswordError}
                  id="form-layouts-confirm-password"
                  onChange={handleChange("confirmPassword")}
                  aria-describedby="form-layouts-confirm-password-helper"
                  type={values.showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickConfirmPassShow}
                        onMouseDown={handleMouseDownPassword}
                        aria-label="toggle password visibility"
                      >
                        {values.showConfirmPassword ? (
                          <EyeOutline />
                        ) : (
                          <EyeOffOutline />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="form-layouts-confirm-password-helper">
                  {!values.confirm
                    ? "Make sure to type the same password as above"
                    : "confirm password!"}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  onClick={handleJoin}
                >
                  Get Started!
                </Button>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ mr: 2 }}>
                    Already have an account?
                  </Typography>
                  <Link href="/login">Log in</Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
const join = () => {
  return (
    <DefaultLayout>
      <FormLayoutsBasic />
    </DefaultLayout>
  );
};

export default join;
