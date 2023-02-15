import React from "react";
import HomeNavbar  from "../navbars/HomeNavbar"
import { Box, Container, Typography } from "@mui/material";
import Footer from "../Footer";

function Information() {
  return (
    <>
      <HomeNavbar/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '80vh',
        }}
      >
        <Container
            component="main"
            sx={{
              minHeight: "80vh",
              backgroundColor: "#E2FFDD",
              borderTop: "3px solid #28F506",
              display: "flex",
              flexDirection: "column",
              fontFamily: "Farro",
            }}
            maxWidth='100vh'
        >
          <Box
            sx={{
              ml: 30,
              mt: 10,
            }}
          >
            <Typography
              sx={{
                fontSize: 40,
              }}
            >
              Czym jest Twoje Portfolio?
            </Typography>
            <Typography
              sx={{
                fontSize: 24,
                whiteSpace: "pre-line",
                mt: 3,
              }}
            >
              {'Usługa Twoje Portfolio jest kreatorem stron internetowych,\n'}
              które mają służyć za portfolio twojej firmy lub twojej działalności.
            </Typography>
            <Typography
              sx={{
                fontSize: 24,
                whiteSpace: "pre-line",
                mt: 3,
              }}
            >
              {'Aby korzystać z kreatora Twoje Portfolio wystarczą ci podstawowe\n'}
              umiejętności korzystania z komputera i przeglądarek internetowych.
            </Typography>
            <Typography
              sx={{
                fontSize: 24,
                whiteSpace: "pre-line",
                mt: 3,
              }}
            >
              {'Do tworzenia własnego portfolio możesz skorzystać z bazy wielu szablonów,\n'}
              która ciągle rośnie i jest rozwijana z myslą o klientach.
            </Typography>
            <Typography
              sx={{
                fontSize: 24,
                whiteSpace: "pre-line",
                mt: 3,
              }}
            >
              {'Z myślą o naszych użytkownikach, przygotowaliśmy wiele poradników\n'}
              i instrukcji związanych z korzystaniem z naszych usług.
            </Typography>
          </Box>
        </Container>
        <Footer/>
      </Box>
    </>
  );
}

export default Information;