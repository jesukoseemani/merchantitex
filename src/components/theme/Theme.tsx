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
          // borderRadius: "20px",
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
            display: "none"
          }
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "0 10px",
          minHeight: 44
        },
        input: {
          height: "44px",
          padding: "0 !important"
        },
        inputMultiline: {
          padding: "10px",
          // minHeight: 54,
        },




      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "20px !important"
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: "0px !important",
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          padding: " 0!important",
          fontFamily: 'Avenir',
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "19px",
          color: "#333333",
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: 44,

        },
        

      }
    }





  },



} as ThemeOptions);
export default theme;