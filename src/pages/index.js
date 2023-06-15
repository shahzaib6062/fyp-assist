import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import ResponsiveAppBar from '../../compoents/Navbar';
import { useAuth } from '../../firebase/auth';
import { useRouter } from 'next/router';
import Loader from '../../compoents/Loader';
import admin from '../../public/admin.png';
import supervisor from '../../public/supervisor.png';
import student from '../../public/student.png';
import img1 from '../../public/vecteezy_technology-background-concept-circuit-board-electronic_6430145.jpg';
import img2 from '../../public/Wallpaper-Black-And-White-Laptop-Computer-Keyboards-Tech43-1536x864.jpg';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { authUser, isLoading, setAuthUser, currentUser } = useAuth();
  const router = useRouter();
  if (currentUser) {
    if (currentUser.role === 'admin') {
      return isLoading ? (
        <Loader />
      ) : (
        <div>
          <ResponsiveAppBar
            navLinks={[{ label: 'redirect Link', href: '/admin' }]}
          ></ResponsiveAppBar>
          <Link href={'/admin'}>Redirect Link</Link>
        </div>
      );
    } else if (currentUser.role === 'supervisor') {
      return isLoading ? (
        <Loader />
      ) : (
        <div>
          <ResponsiveAppBar
            navLinks={[{ label: 'redirect Link', href: '/supervisor' }]}
          ></ResponsiveAppBar>
          <Link href={'/supervisor'}>Redirect Link</Link>
        </div>
      );
    } else if (currentUser.role === 'student') {
      return isLoading ? (
        <Loader />
      ) : (
        <div>
          <ResponsiveAppBar
            navLinks={[{ label: 'redirect Link', href: '/student' }]}
          ></ResponsiveAppBar>
          <Link href={'/student'}>Redirect Link</Link>
        </div>
      );
    }
  } else {
    return isLoading ? (
      <Loader />
    ) : (
      <div>
        <ResponsiveAppBar
          navLinks={[{ label: 'login', href: '/login' }]}
        ></ResponsiveAppBar>
        {/* <!-- header --> */}
        <header>
          <section class="header">
            <div class="logo">
              <h2>FYP Assist</h2>
            </div>
            <div class="slogan">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque, ipsum rerum temporibus amet quis iusto?
            </div>
            <div class="login">
              <Link href="login">Login</Link>
            </div>
          </section>
        </header>

        {/* <!-- main --> */}
        <main>
          <section class="users">
            <h2 class="about">Our Users</h2>
            <div class="row">
              <div class="box">
                <Image src={admin} alt="admin" class="img" />
                <h4 class="head">Admin</h4>
                <p class="info">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate ad possimus mollitia expedita impedit tenetur illum
                  minus pariatur rerum voluptatum.
                </p>
              </div>
              <div class="box">
                <Image src={supervisor} alt="supervisor" class="img" />
                <h4 class="head">Supervisor</h4>
                <p class="info">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate ad possimus mollitia expedita impedit tenetur illum
                  minus pariatur rerum voluptatum.
                </p>
              </div>
              <div class="box">
                <Image src={student} alt="student" class="img" />
                <h4 class="head">Student</h4>
                <p class="info">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate ad possimus mollitia expedita impedit tenetur illum
                  minus pariatur rerum voluptatum.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* <!-- footer --> */}
        <footer></footer>
      </div>
    );
  }
}
