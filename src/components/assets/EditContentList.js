import React, {useCallback, useEffect, useState} from "react";
import {BaseUrl} from "../../services/ApiCalls";
import {Box, TextField, Typography} from "@mui/material";
import {CustomButton} from "./CustomButton";


function EditContentList(portfolioID) {
  const [responseStatus, setResponseStatus] = useState(null);
  const [formMethodTresc, setFormMethodTresc] = useState("POST");
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [trescList, setTrescList] = useState([
    { id: 1, name: "Tytuł strony", content: "" },
    { id: 2, name: "Tekst o mnie", content: "" },
    { id: 3, name: "Tytuł pierwszego zdjecia", content: "" },
    { id: 4, name: "Opis pierwszego zdjecia", content: "" },
    { id: 5, name: "Tytuł drugiego zdjecia", content: "" },
    { id: 6, name: "Opis drugiego zdjecia", content: "" },
    { id: 7, name: "Tytuł trzeciego zdjecia", content: "" },
    { id: 8, name: "Opis trzeciego zdjecia", content: "" },
    { id: 9, name: "Opis filmu", content: "" },
    { id: 10, name: "Email do kontaktu", content: "" },
  ]);

  const handleChange = (event, index) => {
    const newDataList = [...trescList];
    newDataList[index].content = event.target.value;
    setTrescList(newDataList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formMethodTresc === "POST") {
      for (const data of trescList) {
        const response = await fetch("".concat(`${BaseUrl}`, "portfolio/tresc"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({tresc: data.content, portfolio: portfolioID.portfolioID}, null, 2)
        });
        const json = await response.json();
        setResponseStatus(response.status);
        console.log(json);
      }
    } else if(formMethodTresc === "PATCH"){
      for (const data of trescList) {
        const response = await fetch("".concat(`${BaseUrl}`, "portfolio/tresc/",`${data.id}`,"/"), {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({tresc: data.content}, null, 2)
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
    await fetch("".concat(`${BaseUrl}`, 'portfolio/tresc'),  {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          let temp = r.filter((tresc) => tresc.portfolio === portfolioID.portfolioID)
        if (temp[0].id) {
          setFormMethodTresc("PATCH");
          let index = 0;
          const newDataList = [...trescList];
          temp.forEach((tresc) => {
            if( index < trescList.length){
              newDataList[index].content = tresc.tresc;
              newDataList[index].id = tresc.id;
              index++;
            }
          })
          setTrescList(newDataList);
        }
       })
  },[portfolioID.portfolioID, trescList]);

  useEffect(() => {
    if(portfolioID && !isDataFetched){
      fetchData();
      setIsDataFetched(true);
    }
  }, [portfolioID, isDataFetched, formMethodTresc, fetchData]);

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
          {trescList.map((data, index) => (
            <TextField
              key={data.id}
              label={`${data.name}`}
              onChange={event => handleChange(event, index)}
              value={data.content}
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
            EDYTUJ TRESC
          </CustomButton>
        </Box>
      </form>
      {creatingNegativeMessage()}
    </>
  );
}

export default EditContentList;