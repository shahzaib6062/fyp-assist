import * as React from 'react';
import CardGroup from '../../compoents/CardGroup';
import NavbarSupervisor from '../../compoents/NavbarSupervisor';
import Stack from '@mui/joy/Stack';
import { db } from '../../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuth } from '../../firebase/auth';
import Link from 'next/link';
import AuthWrapper from '../../compoents/AuthWrapper';
import ResponsiveAppBar from '../../compoents/NavbarAdmin';

export default function Supervisor() {
  const { authUser, isLoading, setAuthUser } = useAuth();
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

  return (
    <AuthWrapper authRoles={['supervisor']}>
      <ResponsiveAppBar></ResponsiveAppBar>
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
