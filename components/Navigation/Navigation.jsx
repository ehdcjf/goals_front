import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { UserLogout } from "../../reducers/user";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Navigation = () => {
  const dispatch = useDispatch();
  const { IsLogin, user, loading } = useSelector((state) => state.user);

  const logout = () => {
    dispatch(UserLogout());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            href="/"
          >
            <FlagCircleIcon />
            Cheolog
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Stack direction="row" spacing={2}>
            {IsLogin ? (
              <>
                <IconButton color="inherit" href={`/condition/${user.id}`}>
                  <AccountCircleIcon />
                  {user.name}
                </IconButton>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" href="/login">
                  Login
                </Button>
                <Button color="inherit" href="/join">
                  Join
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
