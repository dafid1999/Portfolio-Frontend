import {createTheme} from "@mui/material";

export const theme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#535353',
          textDecoration: "none",
          ":hover": {
            textDecoration: "none",
            color: '#535353',
          },
        },
      },
    },
  },
  palette: {
    red: '#880303',
    dark: '#535353',
  },
});