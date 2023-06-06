import '@/styles/globals.css';
import '../styles/groupStyle.css';
import { AuthUserProvider } from '../../firebase/auth';
// import { AuthUserProvider } from '@/firebase/auth.jsx';

export default function App({ Component, pageProps }) {
  console.log('app');
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}
