import React from "react";
import HomeNavbar  from "../navbars/HomeNavbar"
import { Box, Container, Typography } from "@mui/material";
import Footer from "../Footer";

function Pricing() {
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
              fontSize: 24,
              lineHeight: 1.2,
              color: "#535353",
            }}
          >
            <Box
              sx={{
                width: "47vh",
                height: "55vh",
                backgroundColor: "#FFFFFF",
                boxShadow: 5,
                borderRadius: 7,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 36,
                  fontWeight: "Bold",
                  mt: 2,
                }}
              >
                STANDARDOWY
              </Typography>
              <Typography
                sx={{
                  mt: 5,
                  whiteSpace: "pre-line",
                }}
                variant="inherit"
              >
                <ul>
                  <li>
                    {'Można posiadać 5 aktywnych portfolio \n'}
                  </li>
                  <li>
                    {'Można użyć szablony z puli tylko dla \n użytkowników standardowych'}
                  </li>
                  <li>
                    {'Na raz można zgłosić tylko jeden \n problem do wsparcia technicznego'}
                  </li>
                  <li>
                    {'Kopie zapasowe dla 10 stron portfolio \n utrzymywane do 1 roku, od ostatniego \n zakupu/przedłużenia planu'}
                  </li>
                </ul>
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  whiteSpace: "pre-line",
                  textAlign: "center",
                }}
                variant="inherit"
              >
                {'5 zł brutto miesięcznie \n' +
                    '/ \n' +
                    '55 zł brutto rocznie'}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100vh",
              height: "79vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Exo",
              fontSize: 24,
              lineHeight: 1.2,
              color: "#535353",
            }}
          >
            <Box
              sx={{
                width: "47vh",
                height: "55vh",
                backgroundColor: "#FFFFFF",
                boxShadow: 5,
                borderRadius: 7,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 36,
                  fontWeight: "Bold",
                  mt: 2,
                }}
              >
                VIP
              </Typography>
              <Typography
                sx={{
                  mt: 5,
                  whiteSpace: "pre-line",
                }}
                variant="inherit"
              >
                <ul>
                  <li>
                    {'Można posiadać nielimitowaną liczbę \n aktywnych portfolio'}
                  </li>
                  <li>
                    {'Można użyć wszystkich szablonów \n dostępnych w bazie'}
                  </li>
                  <li>
                    {'Nielimitowane wsparcie techniczne 24/7'}
                  </li>
                  <li>
                    {'Kopie zapasowe dla 30 stron portfolio \n utrzymywane do 5 lat, od ostatniego \n zakupu/przedłużenia planu'}
                  </li>
                </ul>
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  whiteSpace: "pre-line",
                  textAlign: "center",
                }}
                variant="inherit"
              >
                {'50 zł brutto miesięcznie \n' +
                    '/ \n' +
                    '500 zł brutto rocznie'}
              </Typography>
            </Box>
          </Box>
        </Container>
        <Footer/>
      </Box>
    </>
  );
}

export default Pricing;