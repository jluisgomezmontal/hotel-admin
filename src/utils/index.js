import Swal from "sweetalert2";
import api from "../services/api";

export const obtenerFechaEnEspañol = () => {
  const hoy = new Date();
  const opciones = {
    weekday: "long", // día de la semana (lunes, martes...)
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("es-ES", opciones).format(hoy);
};

export const fetchRoomsAvailableToday = async (setRooms) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const checkIn = today.toISOString().split("T")[0];
    const checkOut = tomorrow.toISOString().split("T")[0];

    const res = await api.get(
      `/reservations/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}`
    );
    setRooms(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const fetchRooms = async (setRooms) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const res = await api.get(`/reservations/rooms/all`);
    setRooms(res.data.allRooms);
  } catch (err) {
    console.error(err);
  }
};
export const createRoom = async (form, theme) => {
  try {
    await api.post("/rooms", form); // usa la instancia api y ruta relativa
    Swal.fire({
      title: "Habitacion creada con éxito",
      icon: "success",
      draggable: true,
      timer: 1500,
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      customClass: {
        popup: "mui-swal-popup",
        title: "mui-swal-title",
        icon: "mui-swal-icon",
      },
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error al crear la habitacion",
      timer: 1500,
      icon: "error",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      customClass: {
        popup: "mui-swal-popup",
        title: "mui-swal-title",
        icon: "mui-swal-icon",
      },
    });
  }
};

export const deleteRoom = async (roomId, theme, onSuccess = () => {}) => {
  const result = await Swal.fire({
    title: "¿Estás seguro que quieres eliminar la habitacion?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",  
    cancelButtonText: "Cancelar",
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    customClass: {
      popup: "mui-swal-popup",
      title: "mui-swal-title",
      icon: "mui-swal-icon",
    },
  });

  if (result.isConfirmed) {
    try {
      await api.delete(`/rooms/${roomId}`);
      await Swal.fire({
        title: "Habitación eliminada con éxito",
        icon: "success",
        timer: 1500,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        customClass: {
          popup: "mui-swal-popup",
          title: "mui-swal-title",
          icon: "mui-swal-icon",
        },
      });
      onSuccess(); // útil si quieres actualizar la UI después
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error al eliminar la habitación",
        icon: "error",
        timer: 1500,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        customClass: {
          popup: "mui-swal-popup",
          title: "mui-swal-title",
          icon: "mui-swal-icon",
        },
      });
    }
  }
};

export const upDateRoom = async (form, theme) => {
  try {
    await api.put(`/rooms/${form._id}`, form); // usa la instancia api y ruta relativa
    Swal.fire({
      title: "Habitacion actualizada con éxito",
      icon: "success",
      timer: 1500,
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      customClass: {
        popup: "mui-swal-popup",
        title: "mui-swal-title",
        icon: "mui-swal-icon",
      },
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error al editar la habitacion",
      timer: 1500,
      icon: "error",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      customClass: {
        popup: "mui-swal-popup",
        title: "mui-swal-title",
        icon: "mui-swal-icon",
      },
    });
  }
};

export const submitReservation = async (e, form, setForm, theme) => {
  e.preventDefault();
  try {
    await api.post("/reservations", form); // usa la instancia api y ruta relativa
    Swal.fire({
      title: "Habitacion reservada con éxito",
      icon: "success",
      timer: 1500,
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      customClass: {
        popup: "mui-swal-popup",
        title: "mui-swal-title",
        icon: "mui-swal-icon",
      },
    });
    setForm({ name: "", email: "", phone: "", checkIn: "", checkOut: "" });
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error al reservar la habitacion",
      timer: 1500,
      icon: "error",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      customClass: {
        popup: "mui-swal-popup",
        title: "mui-swal-title",
        icon: "mui-swal-icon",
      },
    });
  }
};
