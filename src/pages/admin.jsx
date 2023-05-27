import React, { useState, useEffect } from 'react';
import Stack from '@mui/joy/Stack';
import ResponsiveAppBar from '../../compoents/NavbarAdmin';
import AddUserCard from '../../compoents/AddUserCard';
import SupervisorBanner from '../../asserts/imgs/supervisorBanner.jpg';
import StudentBanner from '../../asserts/imgs/studentBanner.jpg';
import { useAuth } from '../../firebase/auth';
import { useRouter } from 'next/router';
import AuthWrapper from '../../compoents/AuthWrapper';

export default function Admin() {
  return (
    <AuthWrapper authRoles={['student']}>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Stack direction="row" justifyContent="space-around" m={5} spacing={2}>
        <AddUserCard
          description="this is to add supervisor"
          user="Supervisor"
          img={StudentBanner.src}
          href="/registerSupervisor"
        ></AddUserCard>
        <AddUserCard
          description="this is to add student"
          user="Student"
          img={SupervisorBanner.src}
          href="/registerStudent"
        ></AddUserCard>
      </Stack>
    </AuthWrapper>
  );
}
