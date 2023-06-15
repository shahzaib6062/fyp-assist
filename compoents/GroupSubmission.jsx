import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../firebase/auth';
// import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { FormControl } from '@mui/material';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc,
  doc,
} from 'firebase/firestore';

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

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmission = async (event) => {
    event.preventDefault();

    if (submission.trim() !== '') {
      const submissionsRef = collection(db, 'submissions');
      const q = query(
        submissionsRef,
        where('title', '==', props.title),
        where('uidGroup', '==', props.groupId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // No existing submission found, create a new one
        const docRef = await addDoc(submissionsRef, {
          uidSuervisor: props.supervisorId,
          uidSubmitter: currentUser.uid,
          uidGroup: props.groupId,
          link: submission,
          title: props.title,
        });
        console.log(docRef);
      } else {
        // Existing submission found, update it
        const submissionDoc = querySnapshot.docs[0];
        const docId = submissionDoc.id;

        await updateDoc(doc(submissionsRef, docId), {
          link: submission,
        });
      }

      handleClose(); // Close the dialog after successful submission
    } else {
      setErrorMessage('Empty field cannot be submitted'); // Set the error message state
    }
  };

  return (
    <div>
      <Button className="dialog" variant="outlined" onClick={handleClickOpen}>
        Open submission box
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          submit
          <FormHelperText className="error_color">
            {errorMessage}
          </FormHelperText>
        </DialogTitle>
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
            required
            variant="standard"
            value={submission}
            onChange={handleSubmissionChange}
          />
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmission}>Submit</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
