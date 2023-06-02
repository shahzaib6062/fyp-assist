import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../../firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
import ResponsiveAppBar from '../../../compoents/Navbar';
import AuthWrapper from '../../../compoents/AuthWrapper';
import GruopSubmission from '../../../compoents/GroupSubmission';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@mui/material';

export default function FypGroup() {
  const [group, setGroup] = useState({});
  const { id } = useRouter().query;
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'groups', id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      setGroup(docSnap.data());
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    <AuthWrapper authRoles={['admin', 'supervisor', 'student']}>
      <ResponsiveAppBar navLinks={[]}></ResponsiveAppBar>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          1
        </Grid>
        <Grid item xs={8}>
          2
        </Grid>
      </Grid>
      <Stack
        m={10}
        spacing={{ xs: 1, sm: 2 }}
        justifyContent="space-around"
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              First Report
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Initial first report submitted, outlining the projects objectives,
              research methodology, and proposed approach, setting the
              foundation for further exploration and development
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <GruopSubmission supervisorId={group.supervisor} groupId={id} />
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Last Report
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Final year project report submitted, showcasing innovative
              research, meticulous analysis, and practical implementation,
              culminating in a successful solution.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <GruopSubmission supervisorId={group.supervisor} groupId={id} />
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Code Submit
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Final code submission for the final year project, delivering a
              robust and functional software solution, incorporating advanced
              algorithms and achieving project objectives effectively.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <GruopSubmission supervisorId={group.supervisor} groupId={id} />
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </AuthWrapper>
  );
}
