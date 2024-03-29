import { createTheme } from '@mui/material';
//import shadows, { Shadows } from '@mui/material/styles/shadows';
export const defaultTheme = createTheme({
  typography: {
    fontFamily: `"Nunito", sans-serif`,
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  palette: {
    primary: {
      main: '#5893F9',
      // light: '#959eac',
    },
    secondary: {
      main: '#ECF2FC',
    },
    info: {
      main: '#D0D4DA',
      // light: '#eff2f6',
    },

  },
  shape: {
    borderRadius: 10
  },
  spacing: 5,
  //shadows: shadows.map(() => 'none') as Shadows,
})
export const theme = createTheme(defaultTheme, {
  components: {

    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0,
          paddingLeft: '30px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0)',
            filter: 'drop-shadow(0 0 0.01px #FFFFFF)'
          },
          '&:active': {
            color: 'rgba(255, 255, 255, 0)',
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
          '&.Mui-selected': {
            '& .MuiListItemText-root': {
              '& .MuiTypography-root': {
                color: '#5893F9'
              }
            },
            backgroundColor: '#303439',
            '&:hover': {
              backgroundColor: '#303439',
            },
          },
        },
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '0px',
          alignItems: 'center'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontFamily: `"Nunito", sans-serif`,
          display: 'flex',
          alignItems: 'center',
          height: '46px'
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        inset: {
          width: '145px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginLeft: '30px',
        },
        middle: {
          borderColor: '#5893F9',
          borderWidth: '3px',
          borderRadius: 5,
          height: '40px',
          margin: 0,
          padding: 0
        }
      }
    },

    MuiTableCell: {
      styleOverrides: {
        body: {
          weight: 400,
          fontSize: '14px',
          color: '#535E6C',
          width: '100%'
        },
        head: {
          weight: 600,
          fontSize: '16px',
          color: '#989CA8',

        },
        footer: {
          weight: 400,
          fontSize: '14px',
          color: '#AFB5BF',
        }
      }
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: `"Nunito", sans-serif`,
        },
        body1: {
          fontSize: '16px',
          lineHeight: '21,82px',
          padding: 0,
          color: 'rgba(255, 255, 255, 0.4)',
        },
        body2: {
          fontSize: '16px',
          lineHeight: '21,82px',
          color: 'rgba(255, 255, 255, 0.2)',
        },
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "16px"
        },

        text: {
          width: "30px",
          height: "30px",
          padding: 0,
          margin: 0,
          backgroundColor: '#F1F3F5',
          borderRadius: '5px',
          minWidth: 'auto',
          '&:hover': {
            backgroundColor: '#E9EEF2'
          },
          '&:active': {
            backgroundColor: '#E2E7EC'
          },
          '&:disabled': {
            backgroundColor: '#F1F3F5'
          }
        },
        contained: {
          backgroundColor: defaultTheme.palette.primary.main,
          padding: '10px 25px 10px 25px',
          borderRadius: '5px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#74A7FF'
          },
          '&:active': {
            backgroundColor: '#598CE2'
          },
          '&:disabled': {
            backgroundColor: '#5893F9'
          }
        },
        outlined: {
          fontWeight: "600",
          padding: '10px 25px 10px 25px',
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          //color: '#D0D4DA',
          borderColor: '#E3E3EA',
          //height: '45px',
          marginBottom: '20px',
          backgroundColor: '#FFFFFF',
          weight: 400,
          fontSize: '14px',
          borderRadius: '5px',
          '&.Mui-focused': {
            color: '#535E6C',
            outline: '1px solid #535E6C',
            fieldset: {
              border: 'none',
            },
          },
        },
        input: {
          height: '17px',
        }
      }
    },
  },

  // MuiModal: {
  //   styleOverrides: {
  //     root: {
  //       ['@media(minWidth: 0px)']: {
  //         backgroundColor: 'red',
  //         top: '100%',
  //         left: '50%',
  //         transform: 'translate(-50%, -50%)',
  //         zIndex: 10,
  //       },
  //     }
  //   },
  // },
});
// export const secondaryTheme = createTheme(defaultTheme, {
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           maxHeight: defaultTheme.spacing(10),
//           padding: defaultTheme.spacing(4, 5),
//           fontWeight: 500,
//           lineHeight: '17px',
//           textTransform: 'none',
//         },
//         contained: {
//           backgroundColor: defaultTheme.palette.info.light,
//           color: defaultTheme.palette.info.main,
//           '&:hover': {
//             backgroundColor: '#e4ecf7'
//           },
//           '&:active': {
//             ackgroundColor: '#dae7f7'
//           },
//           '&:disabled': {
//             opacity: 0.4
//           }
//         },
//       }
//     },
//   }
// })