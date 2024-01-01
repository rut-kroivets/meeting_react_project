import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import meetingsDetails from "../mobx/MeetingsDetails";
import { Box } from "@mui/system";


const Meetings = observer(() => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('dateTime');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy == property && order == 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const data = meetingsDetails.getMeetings;
  const sortedData = data.slice().sort(getComparator(order, orderBy));
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order == 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const getRowColor = (date) => {
    const currentDate = new Date();
    const rowDate = new Date(date);
    // Check if the row date is today
    if (
      rowDate.getDate() === currentDate.getDate() &&
      rowDate.getMonth() === currentDate.getMonth() &&
      rowDate.getFullYear() === currentDate.getFullYear()
    ) {
      return 'red'; // Today
    }
    // Check if the row date is within the current week
    const currentWeekStart = new Date(
      currentDate.
        getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
    if (rowDate >= currentWeekStart && rowDate <= currentWeekEnd) {
      return 'orange'; // This week
    }
    // For other dates
    return 'green';
  };

  return (
    <>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: "100%",
            height: "70%",
          },
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">service type</TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy == 'dateTime'}
                    direction={orderBy == 'dateTime' ? order : 'asc'}
                    onClick={(e) => handleRequestSort(e, 'dateTime')}
                  >
                    date
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">client name</TableCell>
                <TableCell align="right">client phone</TableCell>
                <TableCell align="right">client email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((row) => (                
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: getRowColor(row.dateTime) }}
                >
                  <TableCell align="right">{row.serviceType}</TableCell>
                  <TableCell align="right">{row.dateTime}</TableCell>
                  <TableCell align="right">{row.clientName}</TableCell>
                  <TableCell align="right">{row.clientPhone}</TableCell>
                  <TableCell align="right">{row.clientEmail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
});

export default Meetings;
