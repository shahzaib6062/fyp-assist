import ResponsiveAppBar from '../../compoents/Navbar';
import AuthWrapper from '../../compoents/AuthWrapper';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuth } from '../../firebase/auth';

export default function User() {
  const { authUser, isLoading, setAuthUser, currentUser } = useAuth();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'users'), where('role', '==', 'student '));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
      setUser(querySnapshot);
    };
    fetchData();
  }, [authUser]);
  console.log('user', user);
  return (
    <AuthWrapper authRoles={['admin', 'supervisor']}>
      <ResponsiveAppBar
        navLinks={[
          { label: 'New Supervisor', href: '/registerSupervisor' },
          { label: 'New Student', href: '/registerStudent' },
        ]}
      ></ResponsiveAppBar>
    </AuthWrapper>
  );
}
