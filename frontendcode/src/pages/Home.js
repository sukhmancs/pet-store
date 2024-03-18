// StAuth10244: I Sukhmanjeet Singh, 000838215 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { dog } from '../assets/images';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${dog})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" component="h1">
          Welcome to the Pet Store
        </Typography>        
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={dog}
            title="Dog"
          />
        </Card>
      </Paper>
    </div>
  );
}

export default Home;