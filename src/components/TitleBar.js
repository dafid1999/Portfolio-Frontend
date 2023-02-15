import React, {useEffect, useState} from "react";
import {Box, Link as MaterialLink, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import logo from "../images/Logo_2.png";
import {Navigate} from "react-router";
import {UserInfo, UserType} from "../services/ApiCalls";


const NegativeMessage = () => (
    <Typography>Błąd przy wczytaniu potrzebnych danych.</Typography>
);

function TitleBar(){
  const [userType, setUserType] = useState();
  const [id, setId] = useState();

  const DisplayMessage = () => {
    if (userType === 1) {
      return <Navigate to="/AdminMainPage" />;
    } else if (userType === 2) {
      return <Navigate to="/UserMainPage" />;
    } else if (userType === 3) {
      return <Navigate to="/VIPMainPage" />;
    } else {
      return <NegativeMessage />;
    }
  };

  useEffect(() => {
    UserInfo().then((r) => setId(r.pk));

    if (id) {
      UserType(id).then((r) => {setUserType(r.user_type)});
    }
  });
  return(
    <>
      <Box
          sx={{
            width: '100%',
            height: '10vh',
            backgroundColor: "#82E971",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
        <MaterialLink component={Link} to='/UserMainPage'>
          <Image src={logo} fluid/>
        </MaterialLink>
        {DisplayMessage}
      </Box>
    </>
  )
}

export default TitleBar;