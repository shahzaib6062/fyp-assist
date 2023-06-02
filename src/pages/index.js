import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import ResponsiveAppBar from '../../compoents/Navbar';
import { useAuth } from '../../firebase/auth';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { authUser, isLoading, setAuthUser, currentUser } = useAuth();
  const router = useRouter();
  // if (currentUser) {
  //   if (currentUser.role === 'admin') {
  //     router.push('/admin');
  //   } else if (currentUser.role === 'supervisor') {
  //     router.push('/admin');
  //   } else if (currentUser.role === 'student') {
  //     router.push('/student');
  //   }
  // }
  return (
    <div>
      <ResponsiveAppBar
        navLinks={[{ label: 'login', href: '/login' }]}
      ></ResponsiveAppBar>
      shahzaib
      <Link href="login">Login</Link>
    </div>
  );
}
