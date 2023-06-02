import * as React from 'react';
import CardGroup from '../../compoents/CardGroup';
import Stack from '@mui/joy/Stack';
import { db } from '../../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuth } from '../../firebase/auth';
import Link from 'next/link';
import AuthWrapper from '../../compoents/AuthWrapper';
import ResponsiveAppBar from '../../compoents/Navbar';

export default function Student() {
  const { authUser, isLoading, setAuthUser, currentUser } = useAuth();
  const [groups, setGroupArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, 'groups'),
        where('student', '==', authUser?.uid || '')
      );
      const querySnapshot = await getDocs(q);
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
  return (
    <AuthWrapper authRoles={['student', 'supervisor']}>
      <ResponsiveAppBar navLinks={[]}></ResponsiveAppBar>
      <Stack m={5} direction="row" alignItems="center" spacing={2}>
        {groups.map((g, key) => {
          console.log({ g });
          return (
            <Link key={key} href={`/student/${g.id}`}>
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
