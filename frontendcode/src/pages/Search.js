// StAuth10244: I Sukhmanjeet Singh, 000838215 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    table: {
        minWidth: 650,
    },
});

function Search() {
    const classes = useStyles();
    const [isLoaded, setIsLoaded] = useState(false);
    const [pets, setPets] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");   

    function fetchPets() {
        fetch("http://localhost:3001/api?act=getall")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPets(result);
                    setSearchResults(result);
                })
    }
        
    useEffect(fetchPets, []);

    useEffect(() => {
        if (searchTerm === "") {
            setSearchResults(pets);
        } else {
            setSearchResults(pets.filter(pet => pet.animal.toLowerCase().includes(searchTerm.toLowerCase())));
        }
    }, [searchTerm, pets]);

    return (
        <div className={classes.root}>
            <Typography variant="h4" component="h1">
                Search
            </Typography>    
            <Typography variant="h6" component="h2" style={{ margin: '10px' }}>
            <TextField type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} label="Search" />
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Animal</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((pet) => (
                            <TableRow key={pet.id}>
                                <TableCell>{pet.animal}</TableCell>
                                <TableCell>{pet.description}</TableCell>
                                <TableCell>{pet.age}</TableCell>
                                <TableCell>{pet.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Search;