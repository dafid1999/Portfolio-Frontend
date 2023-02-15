import React, {useCallback, useEffect, useState} from "react";
import {
  Box,
  Container, Link as MaterialLink, styled, TextField, Typography,
} from "@mui/material";
import {AuthUser, BaseUrl} from "../../services/ApiCalls";
import Footer from "../Footer";
import TitleBar from "../TitleBar";
import UserNavbar from "../navbars/UserNavbar";
import {useParams} from "react-router";
import EditTrescList from "../assets/EditContentList";
import EditImagesList from "../assets/EditImagesList";
import EditFilmsList from "../assets/EditFilmsList";
import {Link} from "react-router-dom";

const PortfolioLink = styled(MaterialLink)`
  color: #535353;
  textDecoration: none;
  underline: none;
  
  :hover {
    color: #535353;
    textDecoration: none;
    underline: none;
  }
`;


function PortfolioEditor() {
  const portfolio = useParams()
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioId, setPortfolioId] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

   const PortfolioID =  useCallback(async () => {
     await fetch("".concat(`${BaseUrl}`, 'portfolio/portfolio/'),  {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
     })
       .then((r) => {
         return r.json();
       })
       .then((r) => {
         let temp = r.filter((portfolio) => portfolio.portfolioName.toLowerCase() === portfolioName.toLowerCase())
         setPortfolioId(temp[0].id);
       })
  },[portfolioName]);

  useEffect(() => {
    AuthUser().then((r) => {
      if(r.status === 200){
        setIsLogged(true);
      }
    });
    PortfolioID();
    if(isLoading && portfolioId){
      setIsLoading(false);
    }
    console.log(portfolioId)
  }, [PortfolioID, portfolioId]);

  useEffect(() => {
    setPortfolioName(portfolio.portfolio)
  },[]);

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
                  alignItems: 'center'
                }}
                maxWidth='80vh'
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Typography variant="h3" textAlign="center">
                  <PortfolioLink underline="none" target="_blank" component={Link} to={"".concat("/",`${portfolioName}`)}>
                    Edytujesz {portfolioName}
                  </PortfolioLink>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <Box
                  sx={{
                    width:"50vh",
                  }}
                >
                  <EditTrescList portfolioID={portfolioId} />
                </Box>
                <Box
                  sx={{
                    width:"50vh",
                  }}
                >
                  <EditImagesList portfolioID={portfolioId} />
                  <EditFilmsList portfolioID={portfolioId} />
                </Box>
              </Box>
            </Container>
            </Box>
          <Footer/>
        </>
    );
  }
}

export default PortfolioEditor;