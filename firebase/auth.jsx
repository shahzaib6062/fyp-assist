import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signou as authSignOut } from 'firebase/auth';

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
});

const clear = () => {
  setAuthUser(null);
  setIsLoading(false);
};
export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const authStateChanged = async (user) => {
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
  };
  const signout = () => {
    authSignOut(auth).then(() => clear());
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);
  return {
    useAuth,
    setAuthUser,
    isLoading,
    setIsLoading,
  };
}

export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();

  return <AuthUserContext value={auth}>{children}</AuthUserContext>;
};

export const useAuth = () => useContext(AuthUserContext);
