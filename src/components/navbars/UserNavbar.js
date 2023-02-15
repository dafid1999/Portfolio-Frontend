import React, {useState} from "react";
import {Box, Link as MaterialLink, styled, ThemeProvider, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Logout} from "../../services/ApiCalls";
import {theme} from "../assets/themes";

const LogoutLink = styled(MaterialLink)`
  color: #880303;
  textDecoration: none;
  underline: none;
  
  :hover {
    color: #880303;
    textDecoration: none;
    underline: none;
  }
`;

function UserNavbar(){
  const [logoutStatus, setLogoutStatus] = useState(null);

  const handleLogout = () => {
    Logout().then((r) => setLogoutStatus(r.status));
    if (logoutStatus === 200) {
      return window.location.reload();
    } else {
      return null;
    }
  }

  return (
    <>
      <Box
          sx={{
            minHeight: '83vh',
            width: '20%',
            backgroundColor: "#82E971",
            borderTop: "0.3vh solid #28F506",
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
      >
        <ThemeProvider theme={theme}>
          <Box
              sx={{
                width: '25vh',
                mt: '10vh',
                borderBottom: '0.3vh solid #535353',
              }}
          >
            <Typography fontFamily='farro' fontSize={32} textAlign='center'>
              <MaterialLink component={Link} to='/UserPortfolios' underline='none' variant="inherit">
                Moje Portfolia
              </MaterialLink>
            </Typography>
          </Box>
          <Box
              sx={{
                width: '25vh',
                mt: '4vh',
                borderBottom: '0.3vh solid #535353',
              }}
          >
            <Typography fontFamily='farro' fontSize={32} textAlign='center'>
              <MaterialLink component={Link} to='/UserPortfolios'>
                Szablony
              </MaterialLink>
            </Typography>
          </Box>
          <Box
              sx={{
                width: '25vh',
                mt: '4vh',
                borderBottom: '0.3vh solid #535353',
              }}
          >
            <Typography fontFamily='farro' fontSize={32} textAlign='center'>
              <MaterialLink component={Link} to='/UserPortfolios'>
                Wsparcie
              </MaterialLink>
            </Typography>
          </Box>
          <Box
              sx={{
                width: '25vh',
                mt: '4vh',
                borderBottom: '0.3vh solid #535353',
              }}
          >
            <Typography fontFamily='farro' fontSize={32} textAlign='center'>
              <MaterialLink component={Link} to='/UserPortfolios'>
                Statystyki
              </MaterialLink>
            </Typography>
          </Box>
          <Box
              sx={{
                width: '25vh',
                mt: '4vh',
                borderBottom: '0.3vh solid #535353',
              }}
          >
            <Typography fontFamily='farro' fontSize={32} textAlign='center'>
              <MaterialLink component={Link} to='/UserPortfolios'>
                Wiadomości
              </MaterialLink>
            </Typography>
          </Box>
          <Box
              sx={{
                width: '25vh',
                mt: '4vh',
                borderBottom: '0.3vh solid #535353',
              }}
          >
            <Typography fontFamily='farro' fontSize={32} textAlign='center'>
              <MaterialLink component={Link} to='/UserPortfolios'>
                Ustawienia
              </MaterialLink>
            </Typography>
          </Box>
          <Box
              sx={{
                width: '25vh',
                mt: '15vh',
              }}
          >
            <Typography fontFamily='farro' fontSize={24} color='red' textAlign='center'>
              <LogoutLink component={Link} to="/" onClick={handleLogout}>
                Wyloguj
              </LogoutLink>
            </Typography>
          </Box>
        </ThemeProvider>
      </Box>
    </>
  );
}

export default UserNavbar;