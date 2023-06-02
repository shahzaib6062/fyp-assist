import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../firebase/auth';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
export default function GruopSubmission(props) {
  const [open, setOpen] = React.useState(false);
  const [submission, setSubmission] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmissionChange = (event) => {
    setSubmission(event.target.value);
  };

  const { currentUser } = useAuth();

  const handleSubmission = async (event) => {
    event.preventDefault();

    // Store the data in Firestore
    const docRef = await addDoc(collection(db, 'submissions'), {
      uidSuervisor: props.supervisorId,
      uidSubmitter: currentUser.uid,
      uidGroup: props.groupId,
      link: submission,
    });
    console.log(docRef);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open submission box
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>submit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Paste the link"
            type="string"
            fullWidth
            variant="standard"
            value={submission}
            onChange={handleSubmissionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmission}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
