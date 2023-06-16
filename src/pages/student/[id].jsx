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
import ResponsiveAppBar from '../../../compoents/Navbar';
import AuthWrapper from '../../../compoents/AuthWrapper';
import GruopSubmission from '../../../compoents/GroupSubmission';
import fileLogoIcon from '../../../public/file_logo.png';
import Image from 'next/image';
import GroupChat from '../../../compoents/GroupChat';
import AddComment from '../../../compoents/AddComment';
import GroupInfo from '../../../compoents/GroupInfo';
import Loader from '../../../compoents/Loader';
import { useAuth } from '../../../firebase/auth';

export default function FypGroup() {
  const { authUser, isLoading, setAuthUser } = useAuth();
  const [group, setGroup] = useState({});
  const [chats, setChats] = useState([]);
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
  // var deleteGroupVar = doc(db, 'groups', id);
  // const deleteGroup = () => {
  //   deleteDoc(deleteGroupVar);
  //   router.push('/suoervisor');
  // };
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'groups', id);
      const docSnap = await getDoc(docRef);
      setGroup(docSnap.data());
    };
    if (id) {
      fetchData();
    }

    if (id) {
      fetchDataChat();
    }
  }, [fetchDataChat, id]);
  console.log('chats', chats);
  console.log('fyp group', group);
  return isLoading ? (
    <Loader />
  ) : (
    <AuthWrapper authRoles={['admin', 'supervisor', 'student']}>
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
            <GruopSubmission
              supervisorId={group.supervisor}
              groupId={id}
              title="initial Report"
            />
          </div>
          <div class="btn">
            <GruopSubmission
              supervisorId={group.supervisor}
              groupId={id}
              title="Final Report"
            />
          </div>
          <div>
            <br />
            <p>Your Code</p>
            <div id="outer_button2">
              <div class="btn">
                <GruopSubmission
                  supervisorId={group.supervisor}
                  groupId={id}
                  title="codeLink"
                />
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
