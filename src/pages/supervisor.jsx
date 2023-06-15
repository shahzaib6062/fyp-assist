import * as React from 'react';
import CardGroup from '../../compoents/CardGroup';
import Stack from '@mui/joy/Stack';
import { db } from '../../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuth } from '../../firebase/auth';
import Link from 'next/link';
import AuthWrapper from '../../compoents/AuthWrapper';
import ResponsiveAppBar from '../../compoents/Navbar';
import Loader from '../../compoents/Loader';

export default function Supervisor() {
  const { authUser, isLoading, setAuthUser, currentUser } = useAuth();
  const [groups, setGroupArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, 'groups'),
        where('supervisor', '==', authUser?.uid || '')
      );

      const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, ' => ', doc.data());
      // });

      console.log({ s: querySnapshot.docs });
      const groups = querySnapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setGroupArray(groups);
    };
    fetchData();
  }, [authUser]);
  // console.log({ studentArray });
  console.log({ groups });
  console.log('check current user', authUser, currentUser);
  return isLoading ? (
    <Loader />
  ) : (
    <AuthWrapper authRoles={['supervisor']}>
      <ResponsiveAppBar
        navLinks={[{ label: 'Add Group', href: '/newGroup' }]}
      ></ResponsiveAppBar>
      <Stack m={5} direction="row" alignItems="center" spacing={2}>
        {groups.map((g, key) => {
          console.log({ g });
          return (
            <Link key={key} href={`/supervisor/${g.id}`}>
              <CardGroup
                key={key}
                imgLetter="S"
                userName=""
                projectTitle={g.title}
                description={g.description}
              ></CardGroup>
            </Link>
          );
        })}
      </Stack>
    </AuthWrapper>
  );
}
