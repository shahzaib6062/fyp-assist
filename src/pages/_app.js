import '@/styles/globals.css';
import { AuthUserProvider } from '../../firebase/auth.jsx';

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </>
  );
}
