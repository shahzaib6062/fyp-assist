import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth';
import { auth } from './firebase';
import { useRouter } from 'next/router';

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const authStateChanged = useCallback(async (user) => {
    setIsLoading(true);
    if (!user) {
      clear();
      return;
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
      username: user.displayName,
    });
    setIsLoading(false);
  }, []);

  const signOut = (cb) => {
    authSignOut(auth).then(() => {
      clear();
      if (cb) {
        cb();
      }
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, [authStateChanged]);

  return {
    authUser,
    isLoading,
    signOut,
    setAuthUser,
    currentUser,
    setCurrentUser,
  };
}
export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();

  const router = useRouter();

  useEffect(() => {
    const localUser = localStorage.getItem('currentUser');
    if (localUser) {
      auth.setCurrentUser(JSON.parse(localUser));
    }
    console.log('check local auth');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.setCurrentUser]);

  useEffect(() => {
    if (!auth.isLoading && !auth.authUser && !router.pathname === '/login') {
      console.log('shahzaib ko chandd');
      router.replace('/login');
    }
  }, [auth.authUser, auth.isLoading, router]);

  return (
    <AuthUserContext.Provider value={{ ...auth }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
