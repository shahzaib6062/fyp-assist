import React from 'react';
import UserTable from '../../compoents/UserTable';
import { db } from '../../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useAuth } from '../../firebase/auth';

export default function Submission() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchDataSupervisor = async () => {
      const q = query(
        collection(db, 'submission'),
        where('role', '==', 'supervisor')
      );
      const users = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
        console.log(doc.id, ' => ', doc.data());
      });
      setUsers(users);
    };
    fetchDataSupervisor();
  }, [authUser]);
  console.log(users);
  return (
    <div>
      users
      <UserTable users={users} />
    </div>
  );
}
