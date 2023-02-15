import React, {useCallback, useEffect, useState} from "react";
import {BaseUrl} from "../../services/ApiCalls";
import {Box, TextField, Typography} from "@mui/material";
import {CustomButton} from "./CustomButton";


function EditImagesList(portfolioID) {
  const [responseStatus, setResponseStatus] = useState(null);
  const [formMethodFilm, setFormMethodFilm] = useState("POST");
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [filmyList, setFilmyList] = useState([
    { id: 1, name: "Film", url: "" },
  ]);

  const handleChange = (event, index) => {
    const newDataList = [...filmyList];
    newDataList[index].url = event.target.value;
    setFilmyList(newDataList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formMethodFilm === "POST") {
      for (const data of filmyList) {
        const response = await fetch("".concat(`${BaseUrl}`, "portfolio/filmy"), {
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
    } else if(formMethodFilm === "PATCH"){
      for (const data of filmyList) {
        const response = await fetch("".concat(`${BaseUrl}`, "portfolio/filmy/",`${data.id}`,"/"), {
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
    await fetch("".concat(`${BaseUrl}`, 'portfolio/filmy'),  {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          let temp = r.filter((filmy) => filmy.portfolio === portfolioID.portfolioID)
          console.log(temp)
        if (temp[0].id) {
          setFormMethodFilm("PATCH");
          let index = 0;
          const newDataList = [...filmyList];
          temp.forEach((film) => {
            if( index < filmyList.length){
              newDataList[index].url = film.url;
              newDataList[index].id = film.id;
              index++;
            }
          })
          setFilmyList(newDataList);
        }
       })
  },[portfolioID.portfolioID, filmyList]);

  useEffect(() => {
    if(portfolioID && !isDataFetched){
      fetchData();
      setIsDataFetched(true);
    }
  }, [portfolioID.portfolioID, isDataFetched, formMethodFilm, fetchData]);

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
          {filmyList.map((data, index) => (
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
            EDYTUJ FILMY
          </CustomButton>
        </Box>
      </form>
      {creatingNegativeMessage()}
    </>
  );
}

export default EditImagesList;