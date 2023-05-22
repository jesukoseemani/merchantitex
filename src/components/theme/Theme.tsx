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
            color: "#fff",
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
          height: "20px",
          width: "20px",
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
          color: "pink",
          minHeight: "70px",
          borderLeft: "1px solid #B3B3B3",
          marginTop: "-1rem",
          marginLeft: "-3px",


          "&.Mui-active": {
            borderLeft: "1px solid green !important",
          },
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

    MuiStepLabel: {
      styleOverrides: {
        root: {
          position: "relative",
          width: "100% !important",

        },

        iconContainer: {
          marginTop: "-0.5rem"
        },
        labelContainer: {
          width: "100% !important",
          position: "absolute",
          left: "30.8px",
          top: 0


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
          padding: "0 !important",
          // border: "1px solid #DDDDDD÷÷"
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
          minHeight: 44,
          '& textarea': {
            padding: "10px !important",
          },
          '&.MuiTextField-root': {
            '& ::placeholder': {
              fontFamily: 'Avenir',
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "19px",
              textTransform: "capitalize",
              color: "#B9B9B9",

            }
          }


        },

      }

    },



    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'Avenir semibold',
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "22px",
          color: "#4F4F4F",
          position: 'relative',
          border: "none",


          textTransform: 'capitalize',
          '&.Mui-selected': {
            color: "#27AE60",
            position: "relative",
            border: "none",




            "&::after": {
              content: '""',
              position: "absolute",
              left: "35%",
              bottom: "2px",
              width: "30px !important",
              height: "3px",
              borderBottom: "2px solid #27AE60",
              transform: " translate(-50% -50%)"
            },

          },



          '& .MuiBox-root': {
            padding: '0px !important',


          },

        }
      }
    },




    MuiTabs: {
      styleOverrides: {

        root: {
          postion: "relative",
          textAlign: "left",

          padding: '0px !important',




        },
        indicator: {
          width: "0px !important",
          textAlign: "center",
          margin: "0px 2.2rem !important",
          border: "none",
          display: "none"

          // backgroundColor: "#27AE60",
          // marginTop: "-3rem !important",
        },
        flexContainer: {
          gap: "35px !important",

        },




      }
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          border: "1px solid transparent !important",
          padding: "0px !important"
        },

      }
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: "0px !important",
          width: "100% !important",
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        stickyHeader: {
          padding: "16.5px",
          borderBottom: "transparent !important",
          '&:first-child': {
            paddingLeft: "38px"
          },
          '& h2': {
            // color: "red !important",
            fontFamily: "Avenir SemiBold !important",
            fontStyle: "normal !important",
            fontWeight: "500 !important",
            fontSize: "14px !important",
            lineHeight: "19px",
            letterSpacing: "0.0024px",
            color: "#333 !important",


          }
        },
        body: {
          borderBottom: "1px solid #EFF3F8",
          background: "#fff",
          cursor: "pointer",
          '&:hover': {
            opacity: "0.7"
          },
          '& p': {
            fontFamily: 'Avenir Light',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "19px",
            // color: "#333333",

          }


        }

      }
    }
  },



} as ThemeOptions);
export default theme;