
import DrawerAppBar from '../components/Bar';
import ImgMediaCard from '../components/Card';

import MenuApp from '../components/MenuApp';
import { Box, Container, Grid } from '@mui/material';
import infos from '../components/data'
import { isAuth } from './helpers';
import Footer from '../components/Footer';
import MontessoriComponent from '../components/Carucel';
import ScheduleComponent from '../components/ScheduleComponent';
import { AddWorker } from '../components/AddWorker';




function Workers() {
  return (
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
          
        <Box 
          display="flex"
          flexDirection={"column"}
          maxWidth={600}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc"
            }
          }}
        >
          <AddWorker />
        </Box>

        </Container>
      </Box>
      
      <Footer/>
    </Box>
    
  );
}

export default Workers;