import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, Container, IconButton, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteRoom } from "../utils";

export default function RoomsTable({
  rooms,
  handleCardClick,
  setEditar,
  handleOpen,
  selectedIndex,
  refetchRooms,
}) {
  const { availableRooms, reservedRooms } = rooms;
  const theme = useTheme();
  return (
    <Container maxWidth="lg">
      <TableContainer component={Paper} sx={{ mb: 15 }}>
        <Table sx={{ minWidth: 650 }} aria-label="rooms table">
          <TableHead>
            <TableRow>
              <TableCell>Numero de habitacion</TableCell>
              <TableCell>Tipo de habitacion</TableCell>
              <TableCell>Disponibilidad</TableCell>
              {selectedIndex === 1 && (
                <>
                  <TableCell></TableCell>
                </>
              )}
              {selectedIndex === 2 && (
                <>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {availableRooms?.map((room) => (
              <TableRow key={room._id}>
                <TableCell># {room.number}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {room.type}
                </TableCell>
                <TableCell>
                  <Chip
                    label={room.isAvailable ? "Disponible" : "Ocupada"}
                    color={room.isAvailable ? "success" : "error"}
                    sx={{ mt: 1, color: "white" }}
                  />
                </TableCell>
                {selectedIndex === 1 && (
                  <>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => handleCardClick(room)}
                      >
                        <EditCalendarIcon fontSize="inherit" color="success" />
                      </IconButton>
                    </TableCell>
                  </>
                )}
                {selectedIndex === 2 && (
                  <>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => {
                          setEditar(room);
                          handleOpen();
                        }}
                      >
                        <EditIcon fontSize="inherit" color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() =>
                          deleteRoom(room._id, theme, refetchRooms)
                        }
                      >
                        <DeleteForeverIcon fontSize="inherit" color="error" />
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {reservedRooms?.length > 0 && selectedIndex === 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="rooms table">
            <TableHead>
              <TableRow>
                <TableCell>Numero de habitacion</TableCell>
                <TableCell>Nombre del Huesped</TableCell>
                <TableCell>Disponibilidad</TableCell>
                <TableCell>Correo Electronico</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Entrada</TableCell>
                <TableCell>Salida</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservedRooms?.map((room) => (
                <TableRow key={room._id}>
                  <TableCell># {room.roomNumber}</TableCell>
                  <TableCell>{room.guestName}</TableCell>
                  <TableCell>
                    <Chip
                      label={room.isAvailable ? "Disponible" : "Ocupada"}
                      color={room.isAvailable ? "success" : "error"}
                      sx={{ mt: 1, color: "white" }}
                    />
                  </TableCell>
                  <TableCell>{room.guestEmail}</TableCell>
                  <TableCell>{room.guestPhone}</TableCell>
                  <TableCell>
                    {new Date(room.checkIn).toLocaleDateString("es-MX")}
                  </TableCell>

                  <TableCell>
                    {new Date(room.checkOut).toLocaleDateString("es-MX")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
