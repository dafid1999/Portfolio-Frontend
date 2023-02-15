import React, {useCallback, useEffect, useState} from "react";
import {BaseUrl} from "../../services/ApiCalls";
import {Box, TextField, Typography} from "@mui/material";
import {CustomButton} from "./CustomButton";


function EditImagesList(portfolioID) {
  const [responseStatus, setResponseStatus] = useState(null);
  const [formMethodImages, setFormMethodImages] = useState("POST");
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [zdjeciaList, setZdjeciaList] = useState([
    { id: 1, name: "Logo", url: "" },
    { id: 2, name: "Pierwsze tło", url: "" },
    { id: 3, name: "Drugie tło", url: "" },
    { id: 4, name: "Trzecie tło", url: "" },
    { id: 5, name: "Pierwsze zdjecie", url: "" },
    { id: 6, name: "Drugie zdjecie", url: "" },
    { id: 7, name: "Trzecie zdjecie", url: "" },
  ]);

  const handleChange = (event, index) => {
    const newDataList = [...zdjeciaList];
    newDataList[index].url = event.target.value;
    setZdjeciaList(newDataList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formMethodImages === "POST") {
      for (const data of zdjeciaList) {
        const response = await fetch("".concat(`${BaseUrl}`, "portfolio/zdjecia"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({url: data.url, portfolio: portfolioID.portfolioID}, null, 2)
        });
        const json = await response.json();
        setResponseStatus(response.status);
        console.log(json);
      }
    } else if(formMethodImages === "PATCH"){
      for (const data of zdjeciaList) {
        const response = await fetch("".concat(`${BaseUrl}`, "portfolio/zdjecia/",`${data.id}`,"/"), {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({url: data.url}, null, 2)
        });
        const json = await response.json();
        setResponseStatus(response.status);
        console.log(json);
      }
    }
  };

  const creatingNegativeMessage = () => {
    if (responseStatus === 400) {
      return <Typography>Podczas edytowania portfolio wystąpił błąd.</Typography>;
    } else if (responseStatus === 201) {
      return <Typography>Pomyślnie edytowano portfolio.</Typography>;
    }
  };

  const fetchData = useCallback(async () => {
    await fetch("".concat(`${BaseUrl}`, 'portfolio/zdjecia'),  {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          let temp = r.filter((zdjecia) => zdjecia.portfolio === portfolioID.portfolioID)
          console.log(temp)
        if (temp[0].id) {
          setFormMethodImages("PATCH");
          let index = 0;
          const newDataList = [...zdjeciaList];
          temp.forEach((zdjecia) => {
            if( index < zdjeciaList.length){
              newDataList[index].url = zdjecia.url;
              newDataList[index].id = zdjecia.id;
              index++;
            }
          })
          setZdjeciaList(newDataList);
        }
       })
  },[portfolioID.portfolioID, zdjeciaList]);

  useEffect(() => {
    if(portfolioID && !isDataFetched){
      fetchData();
      setIsDataFetched(true);
    }
  }, [portfolioID.portfolioID, isDataFetched, formMethodImages, fetchData]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx = {{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: "1vh"
          }}
        >
          {zdjeciaList.map((data, index) => (
            <TextField
              key={data.id}
              label={`${data.name}`}
              onChange={event => handleChange(event, index)}
              value={data.url}
              margin="normal"
              required
              size="small"
            />
          ))}
          <CustomButton
            buttonSize="btn--small"
            buttonStyle="btn--primary"
            type="submit"
          >
            EDYTUJ ZDJECIA
          </CustomButton>
        </Box>
      </form>
      {creatingNegativeMessage()}
    </>
  );
}

export default EditImagesList;