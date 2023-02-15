import React, {useEffect, useState} from "react";
import "../../App.css";
import {Box} from "@mui/material";
import {AuthUser} from "../../services/ApiCalls";


function AdminMainPage() {
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    AuthUser().then((r) => setResponseStatus(r.status));
  });

  if (responseStatus === 200) {
    return (
        <>
          <Box sx={{
            width: 1,
            height: 830,
            backgroundColor: "#E2FFDD",
            borderTop: "3px solid #28F506"
          }}>
          </Box>
        </>
    );
  } else
  {
    return (
        <p>Brak autoryzacji</p>
    );
  }
}

export default AdminMainPage;