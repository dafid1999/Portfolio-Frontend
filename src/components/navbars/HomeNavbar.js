import { Nav, Navbar } from "react-bootstrap";
import logo from "../../images/Logo_1.png";
import { Box } from "@mui/material";
import RightSideOfHomeNavbar from "./RightSideOfHomeNavbar";

function HomeNavbar() {
  return (
    <>
      <Box
        sx={{
          minWidth: '100vh',
          minHeight: '13vh',
          backgroundColor: "#82E971",
          pl: '20vh',
        }}
      >
        <Navbar>
          <Box
            sx={{
              minWidth: '12.5vh',
              minHeight: '9vh',
              p: '1vh'
            }}
          >
            <Navbar.Brand href="/">
              <img
                src={logo}
                height='90'
                alt='logo'
                loading='lazy'
              />
            </Navbar.Brand>
          </Box>
          <Box
            sx={{
              minWidth: '50vh',
              minHeight: '9vh',
              p: '1vh',
              pt: '1.5vh',
            }}
          >
            <Nav className="me-auto nav-justified">
              <Nav.Link href="/Information">Informacje</Nav.Link>
              <Nav.Link href="/Instructions">Instrukcje</Nav.Link>
              <Nav.Link href="/pricing">Cennik</Nav.Link>
            </Nav>
          </Box>
          <RightSideOfHomeNavbar />
        </Navbar>
      </Box>
    </>
  );
}

export default HomeNavbar;
