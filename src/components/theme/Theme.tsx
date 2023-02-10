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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "36px",
          width: "100%",
          background: "transparent !important",
          "& .MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: 0,
              background: "transparent",
            },
          },
        },
        input: {
          width: "100%",
          paddingTop: "14px !important",
          paddingBottom: "14px !important",
          fontSize: "24px",
          textAlign: "right",
          border: "0 solid transparent !important",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          "&.Mui-error": {
            ":before": {
              position: "relative",
              content: "url(../themes/icons/error.svg)",
              fontWeight: 900,
              marginRight: "5px",
              top: "1px",
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Public Sans",
          marginLeft: "5px",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "16px",
          marginBottom: "120px !important",
          color: "#8F8FA3 !important",
          "&.MuiInputLabel-shrink": {
            transform: "translate(12px, 7px) scale(1) !important",
            fontSize: "12px",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: "transparent",
          width: "100% !important",
          borderRadius: "6px",
          boxShadow: "none",
          padding: "14px 16px",
          border: "1px solid #DEDBFA",
        },
        icon: {
          color: "#fff",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#6939FF",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background:
            "linear-gradient(0deg, #0D0D17, #0D0D17), #080817 !important",
          marginTop: "8px",
          borderRadius: "116px",
          boxShadow: "none !important",
        },
        list: {
          borderRadius: "6px",
          overflow: "hidden",
          border: "1px solid #2E2E38",
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          ":disabled": {
            background: "#24242D",
            color: "#696969",
          },
          "&:hover": {
            background: "#3145FF",
            boxShadow: "none",
          },
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px 16px",
            gap: "10px",
            background: "#3145FF",
            color: "#FFFFFF",
            borderRadius: "100px",
            letterSpacing: "0.5px",
            fontFamily: "Public Sans",
            fontSize: "14px",
            lineHeight: "16px",
            textAlign: "center",
            textTransform: "capitalize",
            boxShadow: "none",
          },
        },
      ],
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#87849F",
          fontFamily: "Public Sans",
          display: "flex",
          gap: "8px",
          fontWeight: 400,
          fontSize: "14px",
          height: "48px",
          alignSelf: "stretch",
          padding: "11px 16px",
          lineHeight: "16px",
          fontFeatureSettings: "'pnum' on, 'lnum' on",
          "&:hover": {
            background: "#1D1D36",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          position: "relative",
          paddingLeft: "0 !important",
          paddingTop: "20px !important",
          paddingBottom: "8px !important",
          background: "transparent",
          border: "1px solid transparent !important",
          borderRadius: "6px",
          fontFamily: "Public Sans",
          fontWeight: 400,
          fontSize: "15px",
          lineHeight: "16px",
          color: "#4A476F",
          width: "100%",
          transition: "all 0.4s ease",
          "&::placeholder": {
            color: "#87849F !important",
          },
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #F8F8FA inset",
            WebkitTextFillColor: "#4A476F",
          },
          "&.Mui-disabled": {
            color: "#87849F",
            backgroundColor: "#F8F8FA",
          },
          "&:focus": {
            border: "1px solid transparent !important",
          },
        },
        root: {
          position: "relative",
          // border: "1px solid orangered",
          "&::after": {
            border: "0 !important",
          },
          "&::before": {
            border: "0 !important", // use your color
          },
          "&:hover": {
            backgroundColor: "#fff",
          },
          "&$focused": {
            backgroundColor: "#fff",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          border: "1px solid #DBDBDB !important",
          padding: "12px 6px !important",
          fontSize: "16px !important",
          color: "#364154",
          fontWeight: 500,
          lineHeight: "120%",
          letterSpacing: "0.02em",
        },
      },
    },
  },
} as ThemeOptions);
export default theme;