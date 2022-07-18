// ** React Imports
import { useState, Fragment, useRef } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Collapse from "@mui/material/Collapse";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";

// ** Icons Imports
import ChevronUp from "mdi-material-ui/ChevronUp";
import ChevronDown from "mdi-material-ui/ChevronDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TagIcon from "@mui/icons-material/Tag";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const statusObj = {
  "NOT YET": { color: "default" },
  PROCESSING: { color: "success" },
};

const Row = (props) => {
  // ** Props
  const { row } = props;
  const handleUpdateModal = props.handleUpdateModal;
  const handleDelete = props.handleDelete;
  const loginUser = props.loginUser;

  // ** State
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);

  const handleUpdate = (i) => {
    handleUpdateModal(i);
    setMore(false);
  };

  const handleMore = (value) => {
    if (row.owner == loginUser) {
      setMore(value);
    } else if (!loginUser) {
      alert("Please Login");
    } else if (row.owner != loginUser) {
      alert("You are not the owner of this");
    }
  };

  return (
    <Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell width="10%">
          <IconButton aria-label="expand row" size="small">
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" width="50%">
          {row.name}
        </TableCell>
        <TableCell align="center" width="20%">
          <Box>{new Date(row.createdAt).toLocaleString()}</Box>
        </TableCell>
        <TableCell align="center" width="20%">
          <Box>{new Date(row.updatedAt).toLocaleString()}</Box>
        </TableCell>
        <TableCell align="center" width="10%">
          <Chip
            label={row.status}
            color={statusObj[row.status].color}
            sx={{
              height: 24,
              fontSize: "0.75rem",
              textTransform: "capitalize",
              "& .MuiChip-label": { fontWeight: 500 },
            }}
          />
        </TableCell>
        <TableCell align="center" width="10%">
          <IconButton ref={ref} onClick={() => handleMore(true)}>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
          <Menu
            open={more}
            anchorEl={ref.current}
            onClose={() => handleMore(false)}
            PaperProps={{
              sx: { width: 200, maxWidth: "100%" },
            }}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              sx={{ color: "text.secondary" }}
              onClick={() => handleUpdate(row.conditionId)}
            >
              <ListItemIcon>
                <ModeEditOutlineIcon width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary="Edit"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>

            <MenuItem
              sx={{ color: "text.secondary" }}
              onClick={() => handleDelete(row.conditionId)}
            >
              <ListItemIcon>
                <DeleteIcon width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary="Delete"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: "0 !important" }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {row.achievement.length == 0 ? (
              <>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Achitevement: NULL
                </Typography>
              </>
            ) : (
              <Box sx={{ m: 2 }}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Achitevement
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Link</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.achievement.map((a, i) => {
                      return (
                        <TableRow key={a.name + a.link + i}>
                          <TableCell component="th" scope="row" width="30%">
                            {a.name}
                          </TableCell>
                          <TableCell width="70%">
                            <Link
                              href={a.link}
                              target="_blank"
                              underline="hover"
                            >
                              {a.link}
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const ConditionList = (props) => {
  const list = props.conditions;
  const loginUser = props.user;
  const handleUpdateModal = props.handleUpdateModal;
  const handleDelete = props.handleDelete;
  const handleSort = props.handleSort;
  const sort = props.sort;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center" onClick={() => handleSort("name")}>
              <Box>
                Name{" "}
                {sort.sort == "name" ? (
                  <IconButton>
                    {sort.order == 1 ? <ChevronUp /> : <ChevronDown />}
                  </IconButton>
                ) : (
                  <></>
                )}
              </Box>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("create")}>
              <Box>
                CreatedAt{" "}
                {sort.sort == "create" ? (
                  <IconButton>
                    {sort.order == 1 ? <ChevronUp /> : <ChevronDown />}
                  </IconButton>
                ) : (
                  <></>
                )}
              </Box>
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("update")}>
              <Box>
                UpdatedAt{" "}
                {sort.sort == "update" ? (
                  <IconButton>
                    {sort.order == 1 ? <ChevronUp /> : <ChevronDown />}
                  </IconButton>
                ) : (
                  <></>
                )}
              </Box>
            </TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <Row
              key={row.conditionId}
              row={row}
              loginUser={loginUser}
              handleUpdateModal={handleUpdateModal}
              handleDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConditionList;
