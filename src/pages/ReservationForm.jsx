import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { fetchRooms, submitReservation } from "../utils";

dayjs.locale("es-mx");
// en el estado:

const ReservationForm = () => {
  const [isTodayChecked, setIsTodayChecked] = useState(true);
  const theme = useTheme();
  const [checkInDate, setCheckInDate] = useState(dayjs());
  const [checkOutDate, setCheckOutDate] = useState(dayjs().add(1, "day"));
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const { room } = location.state || {};
  const [form, setForm] = useState({
    roomNumber: room?.number ?? "",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkIn: checkInDate,
    checkOut: checkOutDate,
    status: "confirmed",
  });
  // console.log(form);
  // console.log(checkInDate);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (field) => (newValue) => {
    setIsTodayChecked(false);

    if (!newValue) return;

    // Actualiza el estado específico
    if (field === "checkIn") {
      setCheckInDate(newValue);
    } else {
      setCheckOutDate(newValue);
    }

    // Actualiza también el objeto del formulario
    setForm((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  useEffect(() => {
    fetchRooms(setRooms);
  }, []);
  return (
    <Container sx={{ py: 6, pt: 12 }}>
      <Typography variant="h4" gutterBottom color="info">
        Reserva la habitación {room?.number}
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => submitReservation(e, form, setForm, theme)}
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {room === undefined && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Numero de habitacion
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.roomNumber}
              name="roomNumber"
              label="Numero de habitacion"
              onChange={handleChange}
            >
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.number}>
                  {room.number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <TextField
          label="Nombre completo"
          name="guestName"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Correo electrónico"
          name="guestEmail"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Teléfono"
          name="guestPhone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isTodayChecked}
              onChange={(e) => setIsTodayChecked(e.target.checked)}
            />
          }
          label="Hoy"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Fecha de entrada"
              name="checkIn"
              value={checkInDate}
              format="DD/MM/YYYY"
              disablePast
              views={["year", "month", "day"]}
              onChange={handleDateChange("checkIn")}
            />

            <DatePicker
              disablePast
              name="checkOut"
              label="Fecha de salida"
              value={checkOutDate}
              format="DD/MM/YYYY"
              minDate={checkInDate} // ⬅️ Esta línea evita que elija fechas anteriores al check-in
              onChange={handleDateChange("checkOut")}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button variant="contained" type="submit">
          Enviar reserva
        </Button>
      </Box>
    </Container>
  );
};

export default ReservationForm;
