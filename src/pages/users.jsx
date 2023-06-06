import React from 'react';
import UserTable from '../../compoents/UserTable';
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
import Container from '@mui/material/Container';
import { Stack, Typography } from '@mui/material';
import AuthWrapper from '../../compoents/AuthWrapper';
import ResponsiveAppBar from '../../compoents/Navbar';

export default function Users() {
  const { authUser, isLoading, setAuthUser, currentUser } = useAuth();
  const [supervisor, setSupervisor] = useState([]);
  const [student, setStudent] = useState([]);

  useEffect(() => {
    const fetchDataSupervisor = async () => {
      const q = query(
        collection(db, 'users'),
        where('role', '==', 'supervisor')
      );
      const users = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
        console.log(doc.id, ' => ', doc.data());
      });
      setSupervisor(users);
    };
    fetchDataSupervisor();

    const fetchDataStudent = async () => {
      const q = query(collection(db, 'users'), where('role', '==', 'student'));
      const users = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
        console.log(doc.id, ' => ', doc.data());
      });
      setStudent(users);
    };
    fetchDataStudent();
  }, [authUser]);
  return (
    <AuthWrapper authRoles={['admin']}>
      <ResponsiveAppBar
        navLinks={[
          { label: 'New Supervisor', href: '/registerSupervisor' },
          { label: 'New Student', href: '/registerStudent' },
          { label: 'home', href: '/admin' },
        ]}
      ></ResponsiveAppBar>
      <div>
        <Stack sx={{ marginTop: '30px' }} direction="row" spacing={2}>
          <Container maxWidth="sm">
            <UserTable users={supervisor} />
          </Container>
          <Container maxWidth="sm">
            <UserTable users={student} />
          </Container>
        </Stack>
      </div>
    </AuthWrapper>
  );
}
