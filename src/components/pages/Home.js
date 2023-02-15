import React from 'react';
import '../../App.css';
import HomeNavbar from "../navbars/HomeNavbar";
import {Box, Container, Typography} from "@mui/material";
import Footer from "../Footer";

function Home() {
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
              flexDirection: "row",
            }}
            maxWidth='100vh'
        >
          <Box
            sx={{
              width: "100vh",
              height: "79vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              fontFamily: "Exo",
              fontWeight: "semiBold",
              fontSize: 24,
              color: "#535353",
            }}
          >
            <Box
              sx={{
                width: "40vh",
                height: "18vh",
                backgroundColor: "#FFFFFF",
                boxShadow: 5,
                borderRadius: 7,
                mt: 10,
                pt: 2,
                pl: 4,
              }}
            >
              <Typography variant="inherit">
                Zacznij od utworzenia swojego portfolio z własnym unikalnym adresem internetowym!
              </Typography>
            </Box>
            <Box
              sx={{
                width: "40vh",
                height: "18vh",
                backgroundColor: "#FFFFFF",
                boxShadow: 5,
                borderRadius: 7,
                pt: 2,
                pl: 4,
              }}
            >
              <Typography variant="inherit">
                Następnie dodaj swoją treść, zdjęcia i filmy oraz ustaw ich pozycje i właściwości jak ci się podoba!
              </Typography>
            </Box>
            <Box
              sx={{
                width: "40vh",
                height: "18vh",
                backgroundColor: "#FFFFFF",
                boxShadow: 5,
                borderRadius: 7,
                mb: 10,
                pt: 2,
                pl: 4,
                pr: 1,
              }}
            >
              Ciesz się utworzoną przed siebie wizytówką i wzrostem popularności swoich usług.
            </Box>
          </Box>
          <Box
            sx={{
              width: "100vh",
              height: "79vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Typography
              sx={{
                fontFamily: "Farro",
                fontWeight: "regular",
                fontSize: 40,
                color: "#535353",
                height: "18vh",
                whiteSpace: "pre-line",
              }}
            >
              {'Twoje portfolio - kreator portfolio\n'}
              {'online dla ciebie lub twojej firmy!'}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Farro",
                fontWeight: "regular",
                fontSize: 24,
                color: "#535353",
                height: "18vh",
                whiteSpace: "pre-line",
              }}
            >
              {'Utwórz swoją wizytówkę, \n'}
              {'w postaci strony internetowej \n'}
              {'bez kodowania i pomocy informatyka!'}
            </Typography>
            <Box
              sx={{
                width: "45vh",
                backgroundColor: "#FFFFFF",
                boxShadow: 5,
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Farro",
                  fontWeight: "regular",
                  fontSize: 32,
                  color: "#535353",
                }}
              >
                {'Zacznij już teraz!'}
              </Typography>
            </Box>
          </Box>
        </Container>
        <Footer/>
      </Box>
    </>
  );
}

export default Home;