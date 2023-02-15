import React, { useEffect, useState } from "react";
import {
  Box, DialogTitle, TextField, Typography,
} from "@mui/material";
import {BaseUrl, UserInfo} from "../../services/ApiCalls";
import {useFormik} from "formik";
import {CustomButton} from "../assets/CustomButton";
import * as Yup from "yup";
import {Navigate} from "react-router";


const CreatingSchema = Yup.object().shape({
  portfolioName: Yup.string()
      .required("Nazwa portfolio jest wymagana!")
      .min(6, "Unikalny adres url minimum 6 znaków.")
      .matches(/^[a-zA-Z]+$/, 'Unikalny adres url musi się składać tylko z liter'),
});


function PortfolioCreator() {
  const [userId, setUserId] = useState();
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    UserInfo().then((r) => {
      setUserId(r.pk);
    });
  });

  const creator = useFormik({
    initialValues: {
      portfolioName: "",
      wyswietlenia: 0,
      wlasciciel:"",
    },
    validationSchema: CreatingSchema,
    onSubmit: async (values) => {
      values.wlasciciel = userId;
      await fetch("".concat(`${BaseUrl}`, "portfolio/portfolio/"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values, null, 2),
      }).then((r) => {
        setResponseStatus(r.status);
      });
    },
  });

  const url = "".concat("/PortfolioEditor/",`${creator.values.portfolioName}`)

  const creatingNegativeMessage = () => {
    if (responseStatus === 400) {
      return <Typography>Podczas tworzenia portfolio wystąpił błąd.</Typography>;
    } else if (responseStatus === 201) {
      return <Navigate to={url}/>;
    }
  };

  return (
      <>
        <DialogTitle textAlign="center" color="#28F506" fontFamily="Exo" fontSize="32px">
          Kreator Portfolio
        </DialogTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "35vh"
            }}
          >
            <form onSubmit={creator.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                id="portfolioName"
                name="portfolioName"
                placeholder="Nazwa portfolio"
                type="text"
                value={creator.values.portfolioName}
                onChange={creator.handleChange}
                error={creator.touched.portfolioName && Boolean(creator.errors.portfolioName)}
                helperText={creator.touched.portfolioName && creator.errors.portfolioName}
              />
              <Box
                sx = {{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CustomButton
                    buttonSize="btn--medium"
                    buttonStyle="btn--primary"
                    type="submit"
                >
                  STWÓRZ PORTFOLIO
                </CustomButton>
              </Box>
            </form>
          </Box>
          {creatingNegativeMessage()}
        </Box>
      </>
  );
}


export default PortfolioCreator;