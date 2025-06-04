import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Bienvenido al Hotel</Typography>
      <Typography variant="h6" gutterBottom>Reserva tu habitación fácilmente</Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" component={Link} to="/reservar">
          Reservar Ahora
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
