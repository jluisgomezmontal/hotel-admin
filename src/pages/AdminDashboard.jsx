import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  Modal,
  useTheme,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { fetchRoomsAvailableToday, obtenerFechaEnEspañol } from "../utils";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { AddRoom } from "../components/AddRoom";
import RoomsTable from "../components/TableComponent";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KingBedIcon from "@mui/icons-material/KingBed";
import DashboardIcon from "@mui/icons-material/Dashboard";
const AdminDashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [editar, setEditar] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    if (rooms.availableRooms?.length !== 0) {
      setSelectedIndex(0);
    }
  }, []);
  // console.log(rooms.availableRooms?.length === 0);
  // console.log(selekctedIndex);

  useEffect(() => {
    fetchRoomsAvailableToday(setRooms);
  }, [open]);

  const refetchRooms = () => {
    fetchRoomsAvailableToday(setRooms);
  };

  // console.log(rooms);
  const handleCardClick = (room) => {
    Swal.fire({
      title: `¿Quieres reservar la habitacion ${room.number}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      customClass: {
        popup: "mui-swal-popup",
        title: "mui-swal-title",
        icon: "mui-swal-icon",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/reservar", { state: { room } });
      }
    });
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
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
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", pt: 5 }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: "25%",
          bgcolor: isDark ? "#162736" : "#2196f3",
          color: "white",
          overflowY: "auto",
          pt: 10,
        }}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <EventAvailableIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Disponibilidad" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <CalendarMonthIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Reservaciones" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <KingBedIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Habitaciones" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <DashboardIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Resumen" />
          </ListItemButton>
        </List>
        <Divider />
      </Box>

      {/* Main Content */}
      <Container
        sx={{
          py: 6,
          flex: 1,
          overflowY: "auto",
        }}
      >
        <Typography textAlign={"center"} variant="h4" gutterBottom color="info">
          Panel de administración
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ pb: 1 }}>
          {`${selectedIndex === 0 ? "Estado de las habitaciones" : selectedIndex === 2 ? "Argega Habitaciones" : "Reserva habitaciones"} hoy ${obtenerFechaEnEspañol()}`}
        </Typography>
        {selectedIndex === 2 && (
          <IconButton
            sx={{ pb: 5 }}
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
        )}
        {rooms.availableRooms?.length > 0 && (
          <RoomsTable
            rooms={rooms}
            handleCardClick={handleCardClick}
            setEditar={setEditar}
            handleOpen={handleOpen}
            selectedIndex={selectedIndex}
            refetchRooms={refetchRooms}
          />
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddRoom handleClose={handleClose} editar={editar} />
        </Modal>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
