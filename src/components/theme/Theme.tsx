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





      }
    },

    MuiMenuItem: {
      styleOverrides: {
        //  root

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

      styleOverrides: {

        root: {
          color: "#27AE60",
          // bacakground: "red !important",÷

          '&.Mui-checked': {
            color: "transparent",
            '& svg': {
              '& path': {

                stroke: "#27AE60",
                strokeWidth: "1px"

              }
            }
          },
        },

      }
    },
    MuiRadio: {

      styleOverrides: {

        root: {
          color: "#27AE60",
          '&.Mui-checked': {
            color: "#27AE60",
          },
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Avenir',
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "22px",
          color: "#828282",
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
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'Avenir',
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "22px",
          color: "#4F4F4F",
          textTransform: 'capitalize',
          '&.Mui-selected': {
            color: "#27AE60"
          },


        }
      }
    },



    MuiTabs: {
      styleOverrides: {
        root: { postion: "relative" },
        indicator: {
          width: "35px !important",
          margin: "0px 2.2rem !important",
          backgroundColor: "#27AE60",
          // marginTop: "-3rem !important",
        },
        flexContainer: {
          gap: "35px !important"
        }


      }
    },

    MuiTableCell: {
      styleOverrides: {
        stickyHeader: {
          padding: "16.5px",
          '&:first-child': {
            paddingLeft: "38px"
          },
          '& h2': {
            // color: "red !important",
            fontFamily: "Avenir !important",
            fontStyle: "normal !important",
            fontWeight: "500 !important",
            fontSize: "14px !important",
            lineHeight: "19px",
            letterSpacing: "0.0024px",
            color: "#000 !important",

          }
        }
      }
    }
  },



} as ThemeOptions);
export default theme;