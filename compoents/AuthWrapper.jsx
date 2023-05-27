import React, { useEffect } from 'react';
import { useAuth } from '../firebase/auth';
import { useRouter } from 'next/router';

export default function AuthWrapper(props) {
  const { currentUser } = useAuth();
  const router = useRouter();

  const { authRoles } = props;

  const isAllowed = authRoles.some((r) => r === currentUser?.role);

  console.log(currentUser, 'yes');
  console.log(isAllowed);
  useEffect(() => {
    if (!!currentUser && !isAllowed) router.replace('/');
  }, [currentUser, isAllowed, router]);

  return <div>{props.children}</div>;
}
