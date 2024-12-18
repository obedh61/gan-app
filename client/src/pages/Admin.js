import React,  { useState } from 'react'
import DrawerAppBar from '../components/Bar'
import axios from 'axios';
import DashboardAdmin from '../components/Dashboard';

import ImgMediaCard from '../components/Card';

import { Box, Container, Grid } from '@mui/material';
import infos from '../components/data'
import Footer from '../components/Footer';
import MontessoriComponent from '../components/Carucel';
import ScheduleComponent from '../components/ScheduleComponent';


export const Admin = () => {
  const [username, setUsername] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [message, setMessage] = useState('');

  const addUser = () => {
    if (!username || !idNumber) {
      setMessage('Please provide both username and ID number');
      return;
    }

    if (!/^[0-9]{9}$/.test(idNumber)) {
      setMessage('ID number must be 9 digits long');
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API}/addworker`, { username, idNumber })
      .then(() => {
        setMessage('User added successfully');
        setUsername('');
        setIdNumber('');
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        setMessage('Error adding user: ' + (error.response?.data?.message || 'Unknown error'));
      });
  };

  return (
    // <div>
    //     <DrawerAppBar/>
    //     <DashboardAdmin />
    //     <h1 >Admin</h1> 

    //     <div>
    //       <input
    //         type="text"
    //         placeholder="Username"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //       <input
    //         type="text"
    //         placeholder="ID Number (9 digits)"
    //         value={idNumber}
    //         onChange={(e) => setIdNumber(e.target.value)}
    //       />
    //       <button onClick={addUser}>Add User</button>
    //     </div>
    //     {message && <p>{message}</p>}
    // </div>
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Asegura que el contenedor ocupe al menos el 100% de la altura de la ventana
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box>
          <DrawerAppBar />
        </Box>
        
          
        
        <Container >
          
          
          <Grid container  spacing={2}>
            <DashboardAdmin/>
          </Grid>
          

        </Container>
      </Box>
      
      <Footer/>
    </Box>
  )
}
