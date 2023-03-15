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
    },


    MuiCheckbox: {
      // colorSecondary: {
      //   color: '#27AE60 !important',
      //   '&$checked': {
      //     color: '#27AE60',
      //   },
      // },
      styleOverrides: {

        root: {
          color: "#27AE60",
          '&.Mui-checked': {
            color: "#27AE60",
          },
        }
      }
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "#B3B3B3",
          '&.Mui-completed': {
            color: "#27AE60",
          },
          '&.Mui-active': {
            color: "#27AE60",
          },
        },

      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {

          '&.Mui-active': {
            color: "#27AE60",
          },

        },


      }
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          // border: "none"
          height: "80px",

        },
        lineVertical: {
          height: "90px",
          marginTop: "-1rem",


        },

      }
    },
    MuiStepContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            border: "3px solid red",
            display: "none"
          }
        }
      }
    },




  },



} as ThemeOptions);
export default theme;