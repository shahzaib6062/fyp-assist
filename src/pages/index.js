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
  if (currentUser) {
    if (currentUser.role === 'admin') {
      return (
        <div>
          <ResponsiveAppBar
            navLinks={[{ label: 'redirect Link', href: '/admin' }]}
          ></ResponsiveAppBar>
          <Link href={'/admin'}>Redirect Link</Link>
        </div>
      );
    } else if (currentUser.role === 'supervisor') {
      return (
        <div>
          <ResponsiveAppBar
            navLinks={[{ label: 'redirect Link', href: '/supervisor' }]}
          ></ResponsiveAppBar>
          <Link href={'/supervisor'}>Redirect Link</Link>
        </div>
      );
    } else if (currentUser.role === 'student') {
      return (
        <div>
          <ResponsiveAppBar
            navLinks={[{ label: 'redirect Link', href: '/student' }]}
          ></ResponsiveAppBar>
          <Link href={'/student'}>Redirect Link</Link>
        </div>
      );
      // else{
      //   return (
      //     <div>
      //       <ResponsiveAppBar
      //         navLinks={[{ label: 'login', href: '/login' }]}
      //       ></ResponsiveAppBar>
      //       shahzaib
      //       <Link href="login">Login</Link>
      //     </div>
      //   );
      // }
    }
  }
}
