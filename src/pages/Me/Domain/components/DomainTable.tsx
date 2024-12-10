import * as React from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function createData(
  name: string,
  recordType: string,
  value: string[],
  TTL: number,
  protein: number,
  price: number,
) {
  return {
    name,
    recordType,
    value,
    TTL,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.recordType}</TableCell>
        <TableCell align="right">{row.value}</TableCell>
        <TableCell align="right">{row.TTL}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const rows = [
  createData('mc-server.kr', 'A', ['211.147.114.195'], 86400, 4.0, 3.99),
  createData(
    'mc-server.kr',
    'NS',
    [
      'ns-707.awsdns-24.net.',
      'ns-1445.awsdns-52.org.',
      'ns-243.awsdns-30.com.',
      'ns-1842.awsdns-38.co.uk.',
    ],
    172800,
    4.3,
    4.99,
  ),
  createData(
    'mc-server.kr',
    'SOA',
    ['ns-707.awsdns-24.net. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400'],
    900,
    6.0,
    3.79,
  ),
  createData('7percent.mc-server.kr', 'A', ['211.147.114.195'], 86400, 4.3, 2.5),
  createData(
    '_minecraft._tcp.7percent.mc-server.kr',
    'SRV',
    ['0 0 25500 7percent.mc-server.kr'],
    86400,
    3.9,
    1.5,
  ),
  createData('example.mc-server.kr', 'A', ['1.1.1.1'], 300, 3.9, 1.5),
  createData('example1.mc-server.kr', 'A', ['1.1.1.1'], 300, 3.9, 1.5),
  createData('example2.mc-server.kr', 'A', ['1.1.1.1'], 300, 3.9, 1.5),
];

export default function DomainTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Record Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Value/Traffic Route Target</TableCell>
            <TableCell align="right">TTL</TableCell>
            <TableCell align="right">temp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
