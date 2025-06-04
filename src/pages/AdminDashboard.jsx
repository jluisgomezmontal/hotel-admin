import { useEffect, useState } from "react";
import { Container, Typography, IconButton, Modal } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { fetchRoomsAvailableToday, obtenerFechaEnEspañol } from "../utils";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { AddRoom } from "../components/AddRoom";
import RoomsTable from "../components/TableComponent";

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [editar, setEditar] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchRoomsAvailableToday(setRooms);
  }, [open]);

  const handleCardClick = (room) => {
    Swal.fire({
      title: `¿Quieres reservar la habitacion ${room.number}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/reservar", { state: { room } });
      }
    });
  };

  // const handleSave = async () => {
  //   try {
  //     await api.patch(`/reservations/${selectedRoom._id}/status`, selectedRoom);
  //     setSelectedRoom(null);
  //     fetchRooms();
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error al actualizar la habitación");
  //   }
  // };

  // Reemplaza handleSave con este
  // const handleSave = () => {
  //   const updated = rooms.map((r) =>
  //     r._id === selectedRoom._id ? selectedRoom : r
  //   );
  //   setRooms(updated);
  //   setOpen(false);
  //   setSelectedRoom(null);
  // };
  return (
    <>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Panel de administración
        </Typography>
        <Typography variant="h6" gutterBottom>
          Estado de las habitaciones el dia de hoy {obtenerFechaEnEspañol()}
        </Typography>
        <IconButton
          aria-label="delete"
          color="info"
          size="large"
          onClick={() => {
            setEditar([]);
            handleOpen();
          }}
        >
          <AddBusinessIcon fontSize="inherit" />
        </IconButton>
        {/* <Grid container spacing={2}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room._id}>
              <Card
                onClick={() => handleCardClick(room)}
                sx={{ cursor: "pointer" }}
              >
                <CardContent>
                  <Typography variant="h6">
                    Habitación #{room.number}
                  </Typography>
                  <Typography variant="body2">Tipo: {room.type}</Typography>
                  <Chip
                    label={room.isAvailable ? "Disponible" : "Ocupada"}
                    color={room.isAvailable ? "success" : "error"}
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}
      </Container>
      <RoomsTable
        rooms={rooms}
        handleCardClick={handleCardClick}
        setEditar={setEditar}
        handleOpen={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddRoom handleClose={handleClose} editar={editar} />
      </Modal>
    </>
  );
};

export default AdminDashboard;
