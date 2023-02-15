import React from "react";
import HomeNavbar  from "../navbars/HomeNavbar"
import { Box, Container, Typography } from "@mui/material";
import Footer from "../Footer";

const wideo = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";

function Instructions() {
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
              Poradniki wideo do usługi Twoje Portfolio
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box>
                <video src={wideo} width="350" height="200" controls></video>
              </Box>
              <Box ml={10}>
                <video src={wideo} width="350" height="200" controls></video>
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: 40,
                whiteSpace: "pre-line",
                mt: 3,
              }}
            >
              FAQ Twoje Portfolio
            </Typography>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Czy korzystanie z usługi jest darmowe?
            </Typography>
            <Typography
              sx={{
                fontSize: 24,
              }}
            >
              Nie, zapraszamy na cennik.
            </Typography>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Czy istnięją poradniki do korzystania z usługi?
            </Typography>
            <Typography
              sx={{
                fontSize: 24,
              }}
            >
              Tak, są powyżej.
            </Typography>
          </Box>
        </Container>
        <Footer/>
      </Box>
    </>
  );
}

export default Instructions;