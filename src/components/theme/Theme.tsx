import { borderRadius } from "@material-ui/system";
import { createTheme, ThemeOptions } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#3145FF",
    },
    action: {
      disabled: "#D4D4D4",
      disabledBackground: "#F4F4F4",
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {

        list: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          // padding: "10px 20px",
        },


        paper: {
          borderRadius: "20px",
        },


      }
    },








    MuiAccordion: {
      styleOverrides: {
        "&:before": {
          backgroundColor: "transparent",
        },
      }
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: {
          background: "transparent"
        }
      }
    }
  },



} as ThemeOptions);
export default theme;