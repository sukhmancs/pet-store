// StAuth10244: I Sukhmanjeet Singh, 000838215 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function Inventory() {
    const classes = useStyles();
    const [pets, setPets] = useState([]);
    const [newPet, setNewPet] = useState({ animal: '', description: '', age: '', price: '' });
    const [editId, setEditId] = useState(null);
    const [editPet, setEditPet] = useState({ animal: '', description: '', age: '', price: '' });

    useEffect(() => {
        fetchPets();
    }, []);
           
    function fetchPets() {
        fetch("http://localhost:3001/api?act=getall")
            .then(res => res.json())
            .then(
                (result) => {                    
                    setPets(result);
                }
            )
    };
    const handleInputChange = (event) => {
        setNewPet({ ...newPet, [event.target.name]: event.target.value });
    };

    const handleEditInputChange = (event) => {
        setEditPet({ ...editPet, [event.target.name]: event.target.value });
    };

    const handleAdd = (animal, description, age, price) => {
        fetch(`http://localhost:3001/api?act=add&animal=${animal}&description=${description}&age=${age}&price=${price}`)
          .then(res => res.json())
          .then(() => {
            fetchPets();
          });
    };

    const sanitizeInput = (str) => {
        return str.replace(/\s+/g, ' ')                     // Remove extra spaces
                  .replace(/^\s+|\s+$/g, '')                // Remove leading/trailing spaces
                  .replace(/\b\w/g, l => l.toUpperCase())   // Capitalize first letter of each word                                                                              
    };             

    const handleInputValidation = (animal, description, age, price) => {
        // Input validation
        // don't allow empty strings or strings special characters other than , . ' ( )
        if (!/^[a-zA-Z\s]*$/.test(animal) || !/^[a-zA-Z0-9\s,.'()]*$/.test(description)) {
            alert('Animal and Description must only contain letters and spaces');
            return false;
        };

        // don't allow negative numbers
        if (age < 0 || price < 0) {
            alert('Age and price must be positive numbers');
            return false;
        };

        // don't allow non-numeric values
        if (isNaN(age) || isNaN(price)) {
            alert('Age and price must be numbers');
            return false;
        };

        return true;
    };

    const handleAddPet = (event) => {
        event.preventDefault();

        // Validate input
        if (!handleInputValidation(newPet.animal, newPet.description, newPet.age, newPet.price)) {
            return;
        };
        
        // Sanitize input
        newPet.animal = sanitizeInput(newPet.animal);
        newPet.description = sanitizeInput(newPet.description);                
        
        handleAdd(newPet.animal, newPet.description, newPet.age, newPet.price);
        setNewPet({
            animal: '',
            description: '',
            age: '',
            price: ''
        });                
    };            

    const handleEdit = (pet) => {
        setEditId(pet.id);
        setEditPet(pet);
    };

    const handleSave = (id) => {
        // Validate input
        if (!handleInputValidation(editPet.animal, editPet.description, editPet.age, editPet.price)) {
            return;
        };

        // Sanitize input
        editPet.animal = sanitizeInput(editPet.animal);
        editPet.description = sanitizeInput(editPet.description);

        fetch(`http://localhost:3001/api?act=update&id=${id}&animal=${editPet.animal}&description=${editPet.description}&age=${editPet.age}&price=${editPet.price}`)
          .then(res => res.json())
          .then(() => {
            fetchPets();
          });
        setEditId(null);
    };

    const handleCancel = () => {
        setEditId(null);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/api?act=delete&id=${id}`)
          .then(res => res.json())
          .then(() => {
            fetchPets();
          });
      };

    return (
        <div className={classes.root}>
            <Typography variant="h4" component="h1">
                Inventory
            </Typography>
            <Typography variant="h6" component="h2" style={{ margin: '10px' }}>
                <form onSubmit={handleAddPet}>
                    <Box margin={1}>
                        <TextField name="animal" value={newPet.animal} onChange={handleInputChange} label="Animal" required />
                        <TextField name="description" value={newPet.description} onChange={handleInputChange} label="Description" required />
                        <TextField name="age" value={newPet.age} onChange={handleInputChange} label="Age" required />
                        <TextField name="price" value={newPet.price} onChange={handleInputChange} label="Price" required />
                        <Button type="submit" variant="contained" color="primary" style={{ margin: '10px'}} >Add Pet</Button>
                    </Box>
                </form>
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Animal</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pets.map((pet) => (
                            <TableRow key={pet.id}>
                                {editId === pet.id ? (
                                    <>
                                        <TableCell>
                                            <TextField name="animal" value={editPet.animal} onChange={handleEditInputChange} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="description" value={editPet.description} onChange={handleEditInputChange} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="age" value={editPet.age} onChange={handleEditInputChange} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="price" value={editPet.price} onChange={handleEditInputChange} />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleSave(pet.id)}>
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton onClick={handleCancel}>
                                                <CancelIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell />
                                    </>
                                ) : (
                                    <>
                                        <TableCell>{pet.animal}</TableCell>
                                        <TableCell>{pet.description}</TableCell>
                                        <TableCell>{pet.age}</TableCell>
                                        <TableCell>{pet.price}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(pet)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleDelete(pet.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Inventory;