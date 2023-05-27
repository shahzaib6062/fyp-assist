import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../../firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ResponsiveAppBar from '../../../compoents/NavbarAdmin';
import AuthWrapper from '../../../compoents/AuthWrapper';

export default function FypGroup() {
  const [group, setGroup] = useState({});
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { id } = useRouter().query;
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'groups', id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      setGroup(docSnap.data());
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    <AuthWrapper authRoles={['admin']}>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </AuthWrapper>
  );
}
