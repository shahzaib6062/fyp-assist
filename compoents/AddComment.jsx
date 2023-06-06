import React, { useState } from 'react';
import userIcon from '../public/user.png';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../firebase/auth';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function AddComment(props) {
  const { groupId, fetchData } = props;
  const [comment, setComment] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const docRef = await addDoc(collection(db, 'GroupChat'), {
      user: currentUser.uid,
      UserName: currentUser.displayName,
      comment: comment,
      groupId: groupId,
      createdAt: Timestamp.fromDate(new Date()),
    });
    await fetchData();
    console.log('commmet in db', docRef);
  };

  const { currentUser } = useAuth();
  return (
    <div class="box_coment">
      <div class="comment_text">
        <div class="flex-heading">
          <Image src={userIcon} alt="user" class="img" />
          <p>{currentUser?.displayName}</p>
        </div>
        <br />
        <div id="comment_text ">
          <div class="comment">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                id="comment"
                name="comment"
                type="text"
                label="Comment"
                required
                variant="standard"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
