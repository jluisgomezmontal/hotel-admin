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
export const createRoom = async (form) => {
  try {
    await api.post("/rooms", form); // usa la instancia api y ruta relativa
    Swal.fire({
      title: "Habitacion creada con éxito",
      icon: "success",
      draggable: true,
      timer: 1500,
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error al crear la habitacion",
      timer: 1500,
      icon: "error",
    });
  }
};
export const upDateRoom = async (form) => {
  try {
    await api.put(`/rooms/${form._id}`, form); // usa la instancia api y ruta relativa
    Swal.fire({
      title: "Habitacion actualizada con éxito",
      icon: "success",
      timer: 1500,
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error al editar la habitacion",
      timer: 1500,
      icon: "error",
    });
  }
};
