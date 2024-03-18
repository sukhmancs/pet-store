// StAuth10244: I Sukhmanjeet Singh, 000838215 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
});

function About() {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Typography variant="h4" component="h1">
                About
            </Typography>
            <Typography variant="body1" component="p">
                Welcome to the Pet Store Inventory! We have a wide variety of pets for you to choose from. We have dogs, cats, birds, fish, and many more! Our pets are healthy and happy, and are ready to go to their forever homes. We have pets of all ages, from puppies and kittens to older pets. We also have a variety of prices to fit any budget. Come on down and see our selection today!
            </Typography>
        </Container>
    );
}

export default About;