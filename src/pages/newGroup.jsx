import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { db } from '../../firebase/firebase';
import { useAuth } from '../../firebase/auth';
import { addDoc } from 'firebase/firestore';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import AuthWrapper from '../../compoents/AuthWrapper';
import ResponsiveAppBar from '../../compoents/Navbar';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        FYP Assist
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
export default function NewGroup() {
  const [studentArray, setStudentArray] = useState([]);

  console.log({ studentArray });
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'users'), where('role', '==', 'student'));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        console.log(doc.id, ' => ', doc.data());
      });

      setStudentArray(querySnapshot.docs);
    };
    fetchData();
  }, []);

  console.log(studentArray);
  const [value1, setValue1] = useState('option1');
  const [inputValue1, setInputValue1] = useState('');
  const [value2, setValue2] = useState('option1');
  const [inputValue2, setInputValue2] = useState('');
  const { authUser, isLoading, setAuthUser } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Find the student documents for selected students
    const student1Doc = studentArray.find(
      (student) => student.data().agNumber === value1
    );
    const student2Doc = studentArray.find(
      (student) => student.data().agNumber === value2
    );
    // Store the data in Firestore
    const docRef = await addDoc(collection(db, 'groups'), {
      title: data.get('title'),
      description: data.get('description'),
      students: [
        doc(db, 'users', student1Doc.data().uid), // Add reference to student document
        doc(db, 'users', student2Doc.data().uid), // Add reference to student document
      ],
      supervisor: authUser.uid,
    });
    console.log(docRef);
    console.log({
      title: data.get('title'),
      description: data.get('description'),
      student1: value1,
      student2: value2,
      user: authUser.uid,
    });
  };

  const options = studentArray.map((student) => student.data().agNumber);

  console.log({ options });

  return (
    <AuthWrapper authRoles={['supervisor']}>
      <ResponsiveAppBar
        navLinks={[{ label: 'Groups', href: '/supervisor' }]}
      ></ResponsiveAppBar>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register New FYP Group
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-title"
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Group Title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Group Description"
                    name="description"
                    autoComplete="description"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    value={value1}
                    onChange={(event, newValue1) => {
                      setValue1(newValue1);
                    }}
                    inputValue={inputValue1}
                    onInputChange={(event, newInputValue1) => {
                      setInputValue1(newInputValue1);
                    }}
                    id="student1"
                    options={options}
                    renderInput={(params) => (
                      <TextField {...params} label="student1" />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    value={value2}
                    onChange={(event, newValue2) => {
                      setValue2(newValue2);
                    }}
                    inputValue={inputValue2}
                    onInputChange={(event, newInputValue2) => {
                      setInputValue2(newInputValue2);
                    }}
                    id="student2"
                    options={options}
                    renderInput={(params) => (
                      <TextField {...params} label="student2" />
                    )}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add New FYP Group
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </AuthWrapper>
  );
}
