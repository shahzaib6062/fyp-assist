import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Link from 'next/link';

export default function AddUserCard(props) {
  return (
    <Card sx={{ minWidth: 345 }}>
      <CardActionArea>
        <Link href={props.href}>
          <CardMedia
            component="img"
            height="140"
            object-fit="contain"
            src={props.img}
            alt="alt"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.user}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
