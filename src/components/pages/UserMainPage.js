import React, { useEffect, useState } from "react";
import "../../App.css";
import {Link} from "react-router-dom";
import {
  Box,
  Container, Dialog, DialogContent,
  Link as MaterialLink,
  ThemeProvider,
  Typography
} from "@mui/material";
import { UserInfo} from "../../services/ApiCalls";
import Footer from "../Footer";
import TitleBar from "../TitleBar";
import UserNavbar from "../navbars/UserNavbar";
import {theme} from "../assets/themes";
import PortfolioCreator from "./PortfolioCreator";



function UserMainPage() {
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  useEffect(() => {
    UserInfo().then((r) => {
      setUserFirstName(r.first_name);
      setUserLastName(r.last_name);
      setIsLogged(true);
      setIsLoading(false);
    });
  });

  const capitalizeFirstLowercaseRest = str => {
    return (
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
  };


  if (isLogged && !isLoading) {
    return (
        <>
          <TitleBar/>
          <Box
            sx={{display: 'flex'}}
          >
            <UserNavbar/>
            <Container
                component="main"
                sx={{
                  minHeight: '83vh',
                  backgroundColor: "#E2FFDD",
                  borderTop: "0.3vh solid #28F506",
                  borderLeft: "0.3vh solid #28F506",
                  flexShrink: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                maxWidth='80vh'
            >
              <Typography
                  sx={{
                    display: 'flex',
                    textAlign: 'center',
                    fontFamily: 'Exo',
                    fontSize: 24,
                    width: '75%',
                    whiteSpace: 'pre-wrap',
                  }}
              >
                {"".concat("Witaj ", capitalizeFirstLowercaseRest(userFirstName), " ", capitalizeFirstLowercaseRest(userLastName), " na stronie głównej naszego panelu kreatora stron portfolio. \n")}
                {'Z tego miejsca możesz przejść do interesującego cię miejsca korzystając z nawigacji po lewej stronie.\n'}
                {'Poniżej masz możliwość wybrania szybkiej akcji lub przejścia do instrukcji obsługi z naszej usługi.'}
              </Typography>
              <ThemeProvider theme={theme}>
                <Box
                    sx={{
                      height: '50%',
                      width: '80%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}
                >
                  <Box
                      sx={{
                        backgroundColor: "#D9D9D9",
                        border: "0.3vh solid #28F506",
                        height: '45%',
                        width: '14%',
                        display: 'flex',
                        alignItems: 'center',
                        mx: 'auto',
                      }}
                      onClick={handleOpenCreate}
                  >
                    <Typography fontFamily='exo' fontSize={24} color='dark' textAlign='center'>
                      Utwórz portfolio
                    </Typography>
                    <Dialog
                      open={openCreate}
                      onClose={handleCloseCreate}
                      maxWidth={'sm'}
                      fullWidth={1}
                    >
                      <DialogContent>
                        <PortfolioCreator/>
                      </DialogContent>
                    </Dialog>
                  </Box>
                  <Box
                      sx={{
                        backgroundColor: "#D9D9D9",
                        border: "0.3vh solid #28F506",
                        height: '45%',
                        width: '14%',
                        display: 'flex',
                        alignItems: 'center',
                        mx: 'auto',
                      }}
                  >
                    <MaterialLink component={Link} to="/" underline='none' variant="inherit">
                      <Typography fontFamily='exo' fontSize={24} color='dark' textAlign='center'>
                        Otwórz najnowszą wiadomość
                      </Typography>
                    </MaterialLink>
                  </Box>
                  <Box
                      sx={{
                        backgroundColor: "#D9D9D9",
                        border: "0.3vh solid #28F506",
                        height: '45%',
                        width: '14%',
                        display: 'flex',
                        alignItems: 'center',
                        mx: 'auto',
                      }}
                  >
                    <MaterialLink component={Link} to="/" underline='none' variant="inherit">
                      <Typography fontFamily='exo' fontSize={24} color='dark' textAlign='center'>
                        Zobacz nowe szablony
                      </Typography>
                    </MaterialLink>
                  </Box>
                  <Box
                      sx={{
                        backgroundColor: "#D9D9D9",
                        border: "0.3vh solid #28F506",
                        height: '45%',
                        width: '14%',
                        display: 'flex',
                        alignItems: 'center',
                        mx: 'auto',
                      }}
                  >
                    <MaterialLink component={Link} to="/" underline='none' variant="inherit">
                      <Typography fontFamily='exo' fontSize={24} color='dark' textAlign='center'>
                        Tutorial używania TwojePortfolio
                      </Typography>
                    </MaterialLink>
                  </Box>
                </Box>
              </ThemeProvider>
            </Container>
            </Box>
          <Footer/>
        </>
    );
  }
}

export default UserMainPage;