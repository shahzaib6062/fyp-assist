import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  getDoc,
  query,
  collection,
  where,
  getDocs,
  docSnap,
  doc,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [group, setGroup] = useState({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchDataGroup = async () => {
      const docRef = doc(db, 'groups', props.id);
      const docSnap = await getDoc(docRef);
      setGroup(docSnap.data());
    };
    if (props.id) {
      fetchDataGroup();
    }
  }, [props.id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log('group info ', group);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'FYP Group Detail'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{group.title}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
