import React, {useCallback, useEffect, useState} from "react";
import {
  Box,
  Container, Link as MaterialLink, styled, Typography,
} from "@mui/material";
import {UserInfo, BaseUrl, AuthUser} from "../../services/ApiCalls";
import Footer from "../Footer";
import TitleBar from "../TitleBar";
import UserNavbar from "../navbars/UserNavbar";
import {LoadingSpinner} from "../assets/LoadingSpinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const EditLink = styled(MaterialLink)`
  color: #C5BE19;
  textDecoration: none;
  underline: none;
  
  :hover {
    color: #C5BE19;
    textDecoration: none;
    underline: none;
  }
`;

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

function UserPortfolios() {
  const [userId, setUserId] = useState();
  const [portfolios, setPortfolios] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(true);

  const AllPortfolios =  useCallback(async () => {
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
       let temp = r.filter((portfolio) => portfolio.wlasciciel === userId)
       setPortfolios(temp);
       setIsLoading2(false);
     })
  },[userId]);

  const DeleteUserPortfolio = useCallback(async (id) => {
     await fetch("".concat(`${BaseUrl}`, 'portfolio/portfolio/', `${id}`,'/'),  {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
     })
      .then((r) => {
        if (r.status === 204) {
          AllPortfolios();
        }
      })
  }, [AllPortfolios]);

  useEffect(() => {
    AuthUser().then((r) => {
      if(r.status === 200){
        setIsLogged(true);
        setIsLoading(false);
      }
    });

    UserInfo().then((r) => {
      setUserId(r.pk);
    });

    if(userId){
      AllPortfolios();
    }
  },[AllPortfolios, userId]);

  if (isLogged && !isLoading) {
    return (
        <>
          <TitleBar />
          <Box
            sx={{display: 'flex'}}
          >
            <UserNavbar />
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
                }}
                maxWidth='80vh'
            >
              <Box
                sx={{
                  height:'10vh',
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  mb:'2vh',
                  color: '#535353',
                }}
              >
                <Typography fontFamily='exo' fontSize={36} style={{ textShadow: "1px 0px 4px #00000060" }}>Lista Twoich Portfolio</Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#82E971",
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  width:'130vh',
                  height:'8vh',
                  color: '#535353',
                  boxShadow: '0px 2px 4px #00000060',
                  mb:'2vh'
                }}
                  fontFamily='exo'
                  fontSize={24}
                  fontWeight='medium'
              >
                <Box ml='10vh'>NAZWA</Box>
                <Box>DATA ZALOZENIA</Box>
                <Box>WYSWIETLENIA</Box>
                <Box>STATUS</Box>
                <Box>EDYTUJ</Box>
                <Box mr='10vh'>USUN</Box>
              </Box>
              <Box>
                { isLoading2 ? (
                  <LoadingSpinner spinnerSize="spin--medium" />
                  ) : (
                  portfolios
                    .map((portfolio) => (
                  <Box
                      sx={{
                        backgroundColor: "#82E971",
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width:'130vh',
                        height:'8vh',
                        color: '#535353',
                        boxShadow: '0px 2px 4px #00000060',
                        mb:'2vh',
                      }}
                      fontFamily='exo'
                      fontSize={24}
                      fontWeight='regular'
                      key={portfolio.id}
                  >
                    <Box sx={{ width:'17vh',textAlign:'center', ml:'9vh'}}><PortfolioLink underline="none" target="_blank" component={Link} to={"".concat("/",`${portfolio.portfolioName}`)}>{portfolio.portfolioName}</PortfolioLink></Box>
                    <Box sx={{ textAlign:'center', ml:'5.5vh'}}>{portfolio.dataZalozenia}</Box>
                    <Box sx={{ width:'27vh', textAlign:'center', ml:'5vh'}}>{portfolio.wyswietlenia}</Box>
                    <Box sx={{ width:'13vh', textAlign:'center', ml:'1vh'}}>{ portfolio.status===1 ? "Dostepny" : (portfolio.status===2 ? "Edytowany" : "Wygasly")}</Box>
                    <Box sx={{ textAlign:'center', ml:'7vh'}}>
                      <EditLink component={Link} to={"".concat("/PortfolioEditor/",`${portfolio.portfolioName}`)} >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                        />
                      </EditLink>
                    </Box>
                    <Box sx={{textAlign:'center', color:'#880303', ml:'12.3vh'}}>
                      <FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => {
                          DeleteUserPortfolio(portfolio.id);
                        }}
                      />
                    </Box>
                  </Box>
                    )))}
              </Box>
            </Container>
            </Box>
          <Footer />
        </>
    );
  }
}

export default UserPortfolios;
