import DefaultLayout from "../layout/Default";
// ** React Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserLoginRequest } from "../reducers/user";
import Router from "next/router";

// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";

// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// Styled component for the form
const Form = styled("form")(({ theme }) => ({
  maxWidth: 600,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  // border: `1px solid ${theme.palette.divider}`,
}));

const FormLayoutsAlignment = () => {
  const dispatch = useDispatch();
  const { IsLogin, user, loading } = useSelector((state) => state.user);

  // ** State
  const [values, setValues] = useState({
    id: "",
    password: "",
    showPassword: false,
  });

  // Login
  const handleLogin = async () => {
    const data = {
      id: values.id,
      pw: values.password,
    };
    dispatch(UserLoginRequest(data));
  };

  //Handle State
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Handle Password
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (IsLogin) {
      Router.push(`/`);
    }
  }, [IsLogin]);

  return (
    <Card>
      <CardHeader
        title="Ceolog Login"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent
        sx={{
          height: "auto",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant="h5">Sign In</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.id}
                onChange={handleChange("id")}
                fullWidth
                label="ID"
                placeholder="ID"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="form-layouts-alignment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  label="Password"
                  value={values.password}
                  onChange={handleChange("password")}
                  id="form-layouts-alignment-password"
                  type={values.showPassword ? "text" : "password"}
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
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                sx={{ width: "100%" }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Form>
      </CardContent>
    </Card>
  );
};
const login = () => {
  return (
    <DefaultLayout>
      <FormLayoutsAlignment />
    </DefaultLayout>
  );
};

export default login;
