/* eslint-disable no-unused-vars */
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Fab,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import { Spa, Pool, Restaurant, WhatsApp } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Home({ toggleColorMode, mode }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const sections = [
    { id: "about", label: "Sobre Nosotros" },
    { id: "services", label: "Servicios" },
    { id: "rooms", label: "Habitaciones" },
    { id: "testimonials", label: "Testimonios" },
  ];

  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" elevation={0}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            bgcolor: isDark ? "#162736" : "#2196f3",
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="inherit">
            Hotel Zen
          </Typography>
          <Box>
            {sections.map((s) => (
              <Button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                sx={{ color: "inherit" }}
              >
                {s.label}
              </Button>
            ))}
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero */}
      {/* Hero */}
      <Box
        id="hero"
        sx={{
          position: "relative",
          height: "100vh",
          backgroundImage: `url(https://images.pexels.com/photos/32398217/pexels-photo-32398217/free-photo-of-fotos-de-dron-de-una-piscina-en-medio-de-una-montana-en-sri-lanka.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          px: 2,
        }}
      >
        {/* Overlay oscuro */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100dvh",
            bgcolor: "rgba(0,0,0,0.5)", // semitransparente negro para contraste
            zIndex: 1,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 2, marginTop: "50vh" }} // aquí bajamos el texto
        >
          <Typography
            variant="h2"
            fontWeight="700"
            sx={{ textShadow: "0 0 8px rgba(0,0,0,0.7)" }}
          >
            Hotel Zen
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
            Un refugio moderno frente al mar
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => scrollTo("rooms")}
          >
            Reservar ahora
          </Button>
        </motion.div>
      </Box>

      <Container maxWidth="lg">
        {/* About */}
        <Box id="about" sx={{ py: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h4" gutterBottom color="text.primary">
              Sobre Nosotros
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Hotel Zen ofrece una experiencia de relajación total en un entorno
              moderno y elegante. Disfruta de nuestras vistas espectaculares,
              habitaciones minimalistas y servicio personalizado.
            </Typography>
          </motion.div>
        </Box>

        {/* Services */}
        <Box id="services" sx={{ py: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h4" gutterBottom color="text.primary">
              Servicios
            </Typography>
            <Grid container spacing={4}>
              {[
                { icon: <Spa fontSize="large" />, title: "Spa y Masajes" },
                { icon: <Pool fontSize="large" />, title: "Alberca Infinity" },
                {
                  icon: <Restaurant fontSize="large" />,
                  title: "Gastronomía Premium",
                },
              ].map((s, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <Box textAlign="center" color="text.primary">
                    {s.icon}
                    <Typography variant="h6" mt={2}>
                      {s.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Rooms */}
        <Box id="rooms" sx={{ py: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h4" gutterBottom color="text.primary">
              Habitaciones
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  name: "Suite Deluxe",
                  img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
                  desc: "Vista al mar, cama king y jacuzzi privado.",
                },
                {
                  name: "Habitación Doble",
                  img: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
                  desc: "Ideal para familias, dos camas queen.",
                },
                {
                  name: "Minimal Room",
                  img: "https://images.pexels.com/photos/10681892/pexels-photo-10681892.jpeg",
                  desc: "Diseño moderno y acogedor.",
                },
                {
                  name: "Descanso",
                  img: "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg",
                  desc: "Ideal para familias, dos camas queen.",
                },
              ].map((room, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="180"
                      image={room.img}
                      alt={room.name}
                    />
                    <CardContent>
                      <Typography variant="h6" color="text.primary">
                        {room.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {room.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Testimonials */}
        <Box id="testimonials" sx={{ py: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h4" gutterBottom color="text.primary">
              Testimonios
            </Typography>

            {[
              {
                text: "Una experiencia inigualable. El lugar perfecto para desconectarse del mundo.",
                author: "Ana M.",
              },
              {
                text: "El servicio fue impecable y las instalaciones superaron mis expectativas.",
                author: "Carlos G.",
              },
              {
                text: "Me encantó la tranquilidad y el diseño minimalista del hotel, volveré pronto.",
                author: "María R.",
              },
              {
                text: "El desayuno fue delicioso y la atención del personal, excepcional.",
                author: "Luis P.",
              },
              {
                text: "Ideal para descansar y disfrutar de un ambiente moderno y relajante.",
                author: "Sofía T.",
              },
            ].map(({ text, author }, i) => (
              <Box key={i} sx={{ mb: 3 }}>
                <Typography
                  variant="body1"
                  fontStyle="italic"
                  color="text.secondary"
                >
                  “{text}”
                </Typography>
                <Typography variant="subtitle1" mt={1} color="text.primary">
                  – {author}
                </Typography>
              </Box>
            ))}
          </motion.div>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          py: 15,
          textAlign: "center",
          // bgcolor: isDark ? "#413D46" : "#2196f3", // fondo casi negro neutro en dark
          bgcolor: isDark ? "#162736" : "#2196f3", // fondo casi negro neutro en dark
          color: isDark ? "grey.400" : "white", // texto gris claro para buen contraste
        }}
      >
        <Box sx={{ mb: 8 }}>
          <Grid
            container
            spacing={2}
            justifyContent="space-around"
            textAlign="left"
          >
            {/* Columna 1 */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Hotel Zen
              </Typography>
              <Divider sx={{ mb: 2, bgcolor: "white" }} />
              <IconButton
                aria-label="Facebook"
                sx={{ color: "white" }} // Azul Facebook
              >
                <FacebookIcon fontSize="large" />
              </IconButton>

              <IconButton
                aria-label="WhatsApp"
                sx={{ color: "white" }} // Verde WhatsApp
              >
                <WhatsAppIcon fontSize="large" />
              </IconButton>

              <IconButton
                aria-label="Instagram"
                sx={{ color: "white" }} // Rosa Instagram
              >
                <InstagramIcon fontSize="large" />
              </IconButton>
            </Grid>

            {/* Columna 2 */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contacto
              </Typography>
              <Divider sx={{ mb: 2, bgcolor: "white" }} />
              <Typography variant="body1">hotelzen@email.com</Typography>
              <Typography variant="body1">+52 744 123 4567</Typography>
            </Grid>

            {/* Columna 3 */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Acceso
              </Typography>
              <Divider sx={{ mb: 2, bgcolor: "white" }} />
              <Button
                variant="contained"
                color={isDark ? "info" : "success"}
                component={Link}
                to="/admin"
              >
                Admin
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mb: 10, bgcolor: "white" }} />
        <Typography variant="body2">
          © {new Date().getFullYear()} Hotel Zen. Todos los derechos
          reservados.
        </Typography>
      </Box>

      {/* WhatsApp Floating Button */}
      <Fab
        color="success"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 2000 }}
        onClick={() => window.open("https://wa.me/5217441234567", "_blank")}
      >
        <WhatsApp />
      </Fab>
    </>
  );
}
