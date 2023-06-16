import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../../firebase/firebase';
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
import BackupIcon from '@mui/icons-material/Backup';
import ResponsiveAppBar from '../../../compoents/Navbar';
import AuthWrapper from '../../../compoents/AuthWrapper';
import GruopSubmission from '../../../compoents/GroupSubmission';
import fileLogoIcon from '../../../public/file_logo.png';
import Image from 'next/image';
import GroupChat from '../../../compoents/GroupChat';
import AddComment from '../../../compoents/AddComment';
import GroupInfo from '../../../compoents/GroupInfo';
import { Button } from '@mui/material';
import Loader from '../../../compoents/Loader';
import { useAuth } from '../../../firebase/auth';
export default function FypGroupSup() {
  const { authUser, isLoading, setAuthUser } = useAuth();
  const [group, setGroup] = useState({});
  const [chats, setChats] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const { id } = useRouter().query;
  const router = useRouter();
  const fetchDataChat = useCallback(async () => {
    const q = query(
      collection(db, 'GroupChat'),
      orderBy('createdAt', 'desc'),
      where('groupId', '==', id)
    );
    const chats = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      chats.push(doc.data());
      console.log(doc.id, ' => ', doc.data());
    });
    setChats(chats);
  }, [id]);

  const deleteGroup = async () => {
    await deleteDoc(doc(db, 'groups', id));
    console.log('delete', id);
    router.replace('/supervisor');
  };
  useEffect(() => {
    const fetchDataGroup = async () => {
      const docRef = doc(db, 'groups', id);
      const docSnap = await getDoc(docRef);
      setGroup(docSnap.data());
    };
    if (id) {
      fetchDataGroup();
    }
    const fetchDataSubmissions = async () => {
      const q = query(
        collection(db, 'submissions'),
        where('uidGroup', '==', id)
      );
      const submission = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        submission.push(doc.data());
        console.log(doc.id, ' => ', doc.data());
      });
      setSubmissions(submission);
    };
    if (id) {
      fetchDataSubmissions();
    }
    if (id) {
      fetchDataChat();
    }
  }, [fetchDataChat, id]);
  console.log('submissions', submissions);
  console.log('chats', chats);
  console.log('fyp group', group);

  const initialRepS = submissions.find((s) => s.title === 'initial Report');
  const finalReps = submissions.find((s) => s.title === 'Final Report');
  const codeReps = submissions.find((s) => s.title === 'finalCode');

  console.log({ initialRepS, finalReps, codeReps });
  return isLoading ? (
    <Loader />
  ) : (
    <AuthWrapper authRoles={['admin', 'supervisor']}>
      <ResponsiveAppBar navLinks={[]}></ResponsiveAppBar>
      <div id="container">
        {/* <!--         pw heading section --> */}
        <div class="flex-heading">
          <Image src={fileLogoIcon} alt="file_logo" class="fileLogClass" />
          <div id="pw_div">
            <h1>{group.title}</h1>
            <p>{group.description}</p>
          </div>
        </div>
        {/* <!-- your work section --> */}
        <div id="work_div">
          <p>Your reports</p>
          <div class="btn">
            {initialRepS ? (
              <a
                className="anchor_style"
                target="_blank"
                href={initialRepS?.link}
              >
                submitted <BackupIcon />
              </a>
            ) : (
              'not submitted'
            )}
          </div>
          <div class="btn">
            {finalReps ? (
              <a
                className="anchor_style"
                target="_blank"
                href={finalReps?.link}
              >
                submitted <BackupIcon />
              </a>
            ) : (
              'not submitted'
            )}
          </div>
          <div>
            <br />
            <p>Your Code</p>
            <div id="outer_button2">
              <div class="btn">
                {codeReps?.link ? (
                  <a
                    className="anchor_style"
                    target="_blank"
                    href={codeReps?.link}
                  >
                    submitted <BackupIcon />
                  </a>
                ) : (
                  'not submitted'
                )}
              </div>
            </div>

            <br />
            <p>Delete this Fyp group</p>
            <div id="outer_button2">
              <div class="btn">
                <Button onClick={deleteGroup}>Delete Group</Button>
              </div>
            </div>
          </div>
        </div>

        {/* <!--  button section --> */}
        {/* <div>
          <div id="outer_button_div">
            <GroupInfo groupId={id} />
          </div>
        </div> */}
      </div>
      <div className="flex-component">
        <div>
          <AddComment groupId={id} fetchData={fetchDataChat} />
        </div>
        <div>
          <GroupChat chats={chats} />
        </div>
      </div>
    </AuthWrapper>
  );
}
