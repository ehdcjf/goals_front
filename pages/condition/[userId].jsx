import DefaultLayout from "../../layout/Default";
// ** React Imports
import { useEffect, useState, forwardRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConditionAddRequest,
  ResetConditionMessageRequest,
  ConditionFetchRequest,
  ConditionInitRequest,
  ConditionUpdateRequest,
  ConditionDeleteRequest,
} from "../../reducers/condition";
import Router from "next/router";
// ** MUI Imports
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TagIcon from "@mui/icons-material/Tag";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";

import ConditionList from "../../components/Condition";
const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxHeight: "90vh",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tagBoxStyle = {
  border: "1px solid #055fec",
};

const Form = styled("form")(({ theme }) => ({
  maxWidth: 600,
  minHeight: 600,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  // border: `1px solid ${theme.palette.divider}`,
}));

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AchievementModal = (props) => {
  const handleCreateAchievement = props.handleCreateAchievement;
  const [open, setOpen] = useState(false);
  const [achievement, setAchievement] = useState({ name: "", link: "" });

  //link 유효성 검사
  const checkLink = (link) => {
    const regex =
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (regex.test(link)) {
      return true;
    }
    return false;
  };

  const handleChange = (prop) => (e) => {
    setAchievement({ ...achievement, [prop]: e.target.value });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setAchievement({ name: "", link: "" });
    setOpen(false);
  };

  const handleComplete = () => {
    if (!checkLink(achievement.link)) {
      alert("Invalid URL");
      return;
    }
    setAchievement({ name: "", link: "" });
    handleCreateAchievement({ ...achievement });
    setOpen(false);
  };

  return (
    <Fragment>
      <Button onClick={handleOpen}>New Achievement</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...modalBoxStyle, width: 400 }}>
          <Typography variant="h5">New Achievement</Typography>
          <TextField
            value={achievement.name}
            onChange={handleChange("name")}
            fullWidth
            margin="normal"
            label="New Achievement Name"
            placeholder="New Achievement Name"
          />
          <TextField
            value={achievement.link}
            onChange={handleChange("link")}
            fullWidth
            margin="normal"
            label="New Achievement Link"
            placeholder="New Achievement Link"
          />
          <Button onClick={handleComplete} color="success">
            Add New Achievement
          </Button>
          <Button onClick={handleClose} color="error">
            Cancle
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
};

const Condition = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, action, conditions, totalSize, isAlien } =
    useSelector((state) => state.condition);
  const { IsLogin, user, token } = useSelector((state) => state.user);
  const router = Router.useRouter();
  const { userId } = router.query;
  const [alert, setAlert] = useState({
    createSuccess: false,
    createError: false,
    updateSuccess: false,
    updateError: false,
    deleteSuccess: false,
    deleteError: false,
  });

  const [condition, setCondition] = useState({
    conditionId: null,
    name: "",
    nameError: false,
    nameHelperText: "",
    status: "",
    achievement: [],
  });

  const [search, setSearch] = useState({
    status: "",
    name: "",
  });

  const [sort, setSorting] = useState({
    sort: "update",
    order: -1,
  });

  const handleSearch = (prop) => (e) => {
    setSearch({ ...search, [prop]: e.target.value });
  };

  //handle pagination
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const data = { page: newPage, rows: rows, ...search, ...sort, userId };
    const clearData = {};
    for (let attributename in data) {
      if (
        data[attributename] !== undefined &&
        data[attributename] !== null &&
        data[attributename] !== ""
      ) {
        clearData[attributename] = data[attributename];
      }
    }

    dispatch(ConditionFetchRequest(clearData));
  };

  const handleChangeRowsPerPage = (event) => {
    setRows(parseInt(event.target.value, 10));
    setPage(0);
    const data = {
      page: 0,
      rows: parseInt(event.target.value, 10),
      ...search,
      ...sort,
      userId,
    };
    const clearData = {};
    for (let attributename in data) {
      if (
        data[attributename] !== undefined &&
        data[attributename] !== null &&
        data[attributename] !== ""
      ) {
        clearData[attributename] = data[attributename];
      }
    }
  };

  //handel Modal
  const [modal, setModal] = useState({ open: false, type: "create" });
  const handleModal = (open, type) => setModal({ open: open, type: type });

  const handleCreateModal = () => {
    setCondition({
      ...condition,
      conditionId: null,
      name: [],
      nameError: false,
      nameHelperText: "",
      status: "",
      achievement: [],
    });
    handleModal(true, "create");
  };

  const handleUpdateModal = (conditionId) => {
    const targetCondition = conditions.filter(
      (v) => v.conditionId == conditionId
    )[0];
    setCondition({ ...condition, ...targetCondition });
    handleModal(true, "update");
  };

  const handleAlert = (prop, value) => {
    setAlert({ ...alert, [prop]: value });
  };

  const handleCondition = (prop) => (e) => {
    setCondition({ ...condition, [prop]: e.target.value });
  };

  const handleAchievement = (type, i) => (e) => {
    const temp = [...condition.achievement];
    temp[i][type] = e.target.value;
    setCondition({ ...condition, achievement: temp });
  };

  const handleCreateAchievement = ({ name, link }) => {
    const newAchievement = { name: name, link: link };
    setCondition({
      ...condition,
      achievement: [...condition.achievement, newAchievement],
    });
  };

  const handleDeleteAchievement = (i) => {
    const temp = [...condition.achievement];
    temp.splice(i, 1);
    setCondition({ ...condition, achievement: temp });
  };

  const createNewCondition = (e) => {
    e.preventDefault();
    if (!condition.name) {
      alert("Name is an empty value.");
      setCondition({
        ...condition,
        nameError: true,
        nameHelperText: "Name is an empty value.",
      });
      return;
    }

    const reqData = {
      token: token,
      condition: {
        name: condition.name,
      },
    };

    dispatch(ConditionAddRequest(reqData));
  };

  const updateCondition = (e) => {
    e.preventDefault();

    if (!condition.name) {
      alert("Name is an empty value.");
      setCondition({
        ...condition,
        nameError: true,
        nameHelperText: "Name is an empty value.",
      });
      return;
    }

    const reqData = {
      token: token,
      condition: {
        conditionId: condition.conditionId,
        name: condition.name,
        status: condition.status,
        achievement: condition.achievement.map((v) => {
          return {
            name: v.name,
            link: v.link,
          };
        }),
      },
    };

    dispatch(ConditionUpdateRequest(reqData));
  };

  const deleteCondition = (conditionId) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      const reqData = {
        token: token,
        conditionId: conditionId,
      };
      dispatch(ConditionDeleteRequest(reqData));
    }
    return;
  };

  //init Conditions

  useEffect(() => {
    if (userId != undefined) {
      const data = { page: page, rows: rows, userId: userId, ...sort };

      dispatch(ConditionFetchRequest(data));
    }
  }, [userId]);

  const searchCondition = () => {
    setPage(0);
    const data = { page: 0, rows: rows, ...search, ...sort, userId };
    const clearData = {};
    for (let attributename in data) {
      if (
        data[attributename] !== undefined &&
        data[attributename] !== null &&
        data[attributename] !== ""
      ) {
        clearData[attributename] = data[attributename];
      }
    }

    dispatch(ConditionFetchRequest(clearData));
  };

  const resetSearch = () => {
    setSearch({ name: "", tag: [], status: "" });
    const data = { page: 0, rows: rows, ...sort, userId };
    const clearData = {};
    for (let attributename in data) {
      if (
        data[attributename] !== undefined &&
        data[attributename] !== null &&
        data[attributename] !== ""
      ) {
        clearData[attributename] = data[attributename];
      }
    }

    dispatch(GoalFetchRequest(clearData));
  };

  const sortCondition = (value) => {
    const originSort = { ...sort };
    let newOrder = -1 * originSort.order;
    if (originSort.sort != value) {
      newOrder = -1;
    }
    setSorting({ sort: value, order: newOrder });

    const data = {
      page: 0,
      rows: rows,
      ...search,
      sort: value,
      order: newOrder,
      userId,
    };
    const clearData = {};
    for (let attributename in data) {
      if (
        data[attributename] !== undefined &&
        data[attributename] !== null &&
        data[attributename] !== ""
      ) {
        clearData[attributename] = data[attributename];
      }
    }

    dispatch(ConditionFetchRequest(clearData));
  };

  // condition nameError reset;
  useEffect(() => {
    if (condition.nameError && condition.name != "") {
      setCondition({ ...condition, nameError: false, nameHelperText: "" });
    }
  }, [condition]);

  //alert Message
  useEffect(() => {
    if (!action) {
      return;
    }
    if (action == "create" && !isError) {
      handleModal(false, "");
      handleAlert("createSuccess", true);
      setCondition({
        conditionId: null,
        name: "",
        nameError: false,
        nameHelperText: "",
        status: "",
        achievement: [],
      });
    } else if (action == "create" && isError) {
      handleModal(false, "create");
      handleAlert("createError", true);
      dispatch(ResetConditionMessageRequest());
    } else if (action == "update" && !isError) {
      handleModal(false, "create");
      handleAlert("updateSuccess", true);
      setCondition({
        conditionId: null,
        name: "",
        nameError: false,
        nameHelperText: "",
        status: "",
        achievement: [],
      });
      dispatch(ResetConditionMessageRequest());
    } else if (action == "update" && isError) {
      handleModal(false, "");
      handleAlert("updateError", true);
      dispatch(ResetConditionMessageRequest());
    } else if (action == "delete" && !isError) {
      handleAlert("deleteSuccess", true);
      dispatch(ResetConditionMessageRequest());
    } else if (action == "delete" && isError) {
      handleAlert("deleteError", true);
      dispatch(ResetConditionMessageRequest());
    }
  }, [action, isError, isLoading]);

  if (!userId) {
    return <CircularProgress />;
  }
  if (isAlien) {
    return <Typography variant="h2">{userId} is an alien </Typography>;
  }

  return (
    <DefaultLayout>
      <Grid container spacing={6} padding={10}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h5">{userId}`s Condition</Typography>
            {IsLogin ? (
              <Button onClick={handleCreateModal}>Create Condition</Button>
            ) : (
              <></>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} padding={5}>
            <Grid item xs={9}>
              <InputLabel id="demo-simple-select-label">Name</InputLabel>
              <TextField
                value={search.name}
                onChange={handleSearch("name")}
                fullWidth
                placeholder=" Condition Name"
              />
            </Grid>
            <Grid item xs={3}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                fullWidth
                value={search.status}
                onChange={handleSearch("status")}
                MenuProps={MenuProps}
              >
                <MenuItem value={""}>ALL</MenuItem>
                <MenuItem value={"NOT YET"}>NOT YET</MenuItem>
                <MenuItem value={"PROCESSING"}>PROCESSING</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12}>
              <Grid container flexDirection="row" justifyContent="flex-end">
                <Button color="success" onClick={searchCondition}>
                  Search
                </Button>
                <Button color="error" onClick={resetSearch}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ConditionList
            conditions={conditions}
            user={user.id ?? null}
            handleUpdateModal={handleUpdateModal}
            handleDelete={deleteCondition}
            handleSort={sortCondition}
            sort={sort}
          />
        </Grid>
        <Grid item xs={12}>
          <TablePagination
            component="div"
            count={totalSize ?? 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rows}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
      <Modal
        open={modal.open}
        onClose={() => handleModal(false, null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyle}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Card>
              <CardHeader
                title={
                  modal.type == "create"
                    ? "Create New Condition"
                    : "Update Condition"
                }
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
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h5">Condition Info</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={condition.name}
                        onChange={handleCondition("name")}
                        fullWidth
                        error={condition.nameError}
                        helperText={condition.nameHelperText}
                        label="Name"
                        placeholder="Name"
                      />
                    </Grid>

                    {modal.type === "create" ? (
                      <>
                        <Grid item xs={12}>
                          <Button
                            size="large"
                            // type="submit"
                            variant="contained"
                            sx={{ width: "100%" }}
                            onClick={createNewCondition}
                          >
                            Create Condition
                          </Button>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">Status</Typography>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={condition.status}
                            defaultValue={condition.status}
                            label="Status"
                            onChange={handleCondition("status")}
                          >
                            <MenuItem value={"NOT YET"}>NOT YET</MenuItem>
                            <MenuItem value={"PROCESSING"}>PROCESSING</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "inline-flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Typography variant="subtitle1">
                              {condition.achievement.length == 0
                                ? "Achievement: NULL"
                                : "Achievement"}
                            </Typography>
                            <AchievementModal
                              handleCreateAchievement={handleCreateAchievement}
                            />
                          </Box>
                        </Grid>
                        {condition.achievement.map((a, a_index) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              key={condition.name + a.name + a.link}
                            >
                              <Grid container spacing={1}>
                                <Grid item xs={6}>
                                  <TextField
                                    value={condition.achievement[a_index].name}
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    label="Achievement Name"
                                    placeholder="Achievement Name"
                                  />
                                </Grid>
                                <Grid item xs={5}>
                                  <TextField
                                    value={condition.achievement[a_index].link}
                                    inputProps={{ readOnly: true }}
                                    fullWidth
                                    label="Achievement Link"
                                    placeholder="Achievement Link"
                                  />
                                </Grid>
                                <Grid item xs={1}>
                                  <IconButton
                                    onClick={() =>
                                      handleDeleteAchievement(a_index)
                                    }
                                  >
                                    <DeleteIcon width={24} height={24} />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Grid>
                          );
                        })}

                        <Grid item xs={12}>
                          <Button
                            size="large"
                            // type="submit"
                            variant="contained"
                            sx={{ width: "100%", mt: "5vh" }}
                            onClick={updateCondition}
                          >
                            Update Condition
                          </Button>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Form>
              </CardContent>
            </Card>
          )}
        </Box>
      </Modal>

      <Snackbar
        open={alert.createSuccess}
        autoHideDuration={6000}
        onClose={() => handleAlert("createSuccess", false)}
      >
        <Alert
          onClose={() => handleAlert("createSuccess", false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Create Condition Success!
        </Alert>
      </Snackbar>
      <Snackbar
        open={alert.createError}
        autoHideDuration={6000}
        onClose={() => handleAlert("createError", false)}
      >
        <Alert
          onClose={() => handleAlert("createError", false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Create Condition Error!
        </Alert>
      </Snackbar>
      <Snackbar
        open={alert.updateSuccess}
        autoHideDuration={6000}
        onClose={() => handleAlert("updateSuccess", false)}
      >
        <Alert
          onClose={() => handleAlert("updateSuccess", false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Update Condition Success!
        </Alert>
      </Snackbar>
      <Snackbar
        open={alert.updateError}
        autoHideDuration={6000}
        onClose={() => handleAlert("updateError", false)}
      >
        <Alert
          onClose={() => handleAlert("updateError", false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Update Condition Error!
        </Alert>
      </Snackbar>
      <Snackbar
        open={alert.deleteSuccess}
        autoHideDuration={6000}
        onClose={() => handleAlert("deleteSuccess", false)}
      >
        <Alert
          onClose={() => handleAlert("deleteSuccess", false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Delte Condition Success!
        </Alert>
      </Snackbar>
      <Snackbar
        open={alert.deleteError}
        autoHideDuration={6000}
        onClose={() => handleAlert("deleteError", false)}
      >
        <Alert
          onClose={() => handleAlert("deleteError", false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Delete Condition Error!
        </Alert>
      </Snackbar>
    </DefaultLayout>
  );
};

export default Condition;
