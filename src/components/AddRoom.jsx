import {
  Box,
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createRoom, upDateRoom } from "../utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "50%" },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const AddRoom = ({ handleClose, editar }) => {
  const [form, setForm] = useState({
    number: "",
    type: "",
  });
  const theme = useTheme();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // Si "editar" no está vacío y tiene propiedades
    if (editar && Object.keys(editar).length > 0) {
      setForm(editar);
    }
  }, [editar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Array.isArray(editar)) {
      createRoom(form, theme);
    } else {
      upDateRoom(form, theme);
    }
    handleClose();
  };
  return (
    <Box sx={style}>
      <Typography variant="h6" mb={2}>
        {Array.isArray(editar)
          ? "Agregar nueva habitación"
          : "Editar habitación"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Número de habitación"
            variant="outlined"
            fullWidth
            name="number"
            type="number"
            value={form.number}
            onChange={handleChange}
          />
        </Grid>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.type}
            label="type"
            onChange={handleChange}
            name="type"
          >
            <MenuItem value={"individual"}>Individual</MenuItem>
            <MenuItem value={"doble"}>Doble</MenuItem>
            <MenuItem value={"suite"}>Suite</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" disableElevation onClick={handleSubmit}>
          Crear habitacion
        </Button>
        <Button
          variant="contained"
          disableElevation
          color="error"
          onClick={handleClose}
        >
          Cancelar
        </Button>
      </Grid>
    </Box>
  );
};
