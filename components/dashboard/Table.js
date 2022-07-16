
// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Collapse from "@mui/material/Collapse";

const rows = [
  {
    age: 27,
    status: "current",
    date: "09/27/2018",
    name: "Sally Quinn",
    salary: "$19586.23",
    email: "eebsworth2m@sbwire.com",
    designation: "Human Resources Assistant",
  },
  {
    age: 61,
    date: "09/23/2016",
    salary: "$23896.35",
    status: "professional",
    name: "Margaret Bowers",
    email: "kocrevy0@thetimes.co.uk",
    designation: "Nuclear Power Engineer",
  },
  {
    age: 59,
    date: "10/15/2017",
    name: "Minnie Roy",
    status: "rejected",
    salary: "$18991.67",
    email: "ediehn6@163.com",
    designation: "Environmental Specialist",
  },
  {
    age: 30,
    date: "06/12/2018",
    status: "resigned",
    salary: "$19252.12",
    name: "Ralph Leonard",
    email: "dfalloona@ifeng.com",
    designation: "Sales Representative",
  },
  {
    age: 66,
    status: "applied",
    date: "03/24/2018",
    salary: "$13076.28",
    name: "Annie Martin",
    designation: "Operator",
    email: "sganderton2@tuttocitta.it",
  },
  {
    age: 33,
    date: "08/25/2017",
    salary: "$10909.52",
    name: "Adeline Day",
    status: "professional",
    email: "hnisius4@gnu.org",
    designation: "Senior Cost Accountant",
  },
  {
    age: 61,
    status: "current",
    date: "06/01/2017",
    salary: "$17803.80",
    name: "Lora Jackson",
    designation: "Geologist",
    email: "ghoneywood5@narod.ru",
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },
  {
    age: 22,
    date: "12/03/2017",
    salary: "$12336.17",
    name: "Rodney Sharp",
    status: "professional",
    designation: "Cost Accountant",
    email: "dcrossman3@google.co.jp",
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  },
];

const statusObj = {
  applied: { color: "info" },
  rejected: { color: "error" },
  current: { color: "primary" },
  resigned: { color: "warning" },
  professional: { color: "success" },
};

const DashboardTable = () => {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <>
                <TableRow
                  hover
                  key={row.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {row.name}
                      </Typography>
                      <Typography variant="caption">
                        {row.designation}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.salary}</TableCell>
                  <TableCell>
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
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} sx={{ py: "0 !important" }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ m: 2 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          History
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Date</TableCell>
                              <TableCell>Customer</TableCell>
                              <TableCell align="right">Amount</TableCell>
                              <TableCell align="right">
                                Total price ($)
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {/* {row.history.map((historyRow) => (
                              <TableRow key={historyRow.date}>
                                <TableCell component="th" scope="row">
                                  {historyRow.date}
                                </TableCell>
                                <TableCell>{historyRow.customerId}</TableCell>
                                <TableCell align="right">
                                  {historyRow.amount}
                                </TableCell>
                                <TableCell align="right">
                                  {Math.round(
                                    historyRow.amount * row.price * 100
                                  ) / 100}
                                </TableCell>
                              </TableRow>
                            ))} */}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
