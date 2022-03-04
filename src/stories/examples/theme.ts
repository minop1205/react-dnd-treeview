import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiSvgIcon: {
      defaultProps: {
        fontSize: "small",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "standard",
        inputProps: {
          style: {
            fontSize: 14,
            padding: "6px 0",
          },
        },
      },
    },
  },
});
