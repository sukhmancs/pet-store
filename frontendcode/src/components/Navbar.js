// StAuth10244: I Sukhmanjeet Singh, 000838215 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Pet Store
                </Typography>
                <Button color="inherit" component={RouterLink} to="/">Home</Button>
                <Button color="inherit" component={RouterLink} to="/inventory">Inventory</Button>
                <Button color="inherit" component={RouterLink} to="/search">Search</Button>
                <Button color="inherit" component={RouterLink} to="/about">About</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;