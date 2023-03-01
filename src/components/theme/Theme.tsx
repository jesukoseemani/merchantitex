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