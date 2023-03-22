import { Components, Theme } from "@mui/material/styles";

const CodeBlockComponents: Components<Omit<Theme, "components">> = {
  MuiAppBar: {
    defaultProps: {
      elevation: 2,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.white.main,
        zIndex: theme.zIndex.drawer + 1,
      }),
    },
  },
  MuiButton: {
    defaultProps: {
      disableTouchRipple: true,
    },
  },
  MuiUseMediaQuery: {
    defaultProps: {
      noSsr: true,
    },
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
    },
  },
};

export default CodeBlockComponents;
