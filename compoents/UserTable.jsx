import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import DeleteIcon from '@mui/icons-material/Delete';
function createData(name, role, email) {
  return { name, role, email };
}

export default function BasicTable(props) {
  const { users } = props;
  const deleteGroup = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    console.log('delete', id);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.displayName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.displayName}
              </TableCell>
              <TableCell align="right">{user.role}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
                <Button onClick={() => deleteGroup(user.uid)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
