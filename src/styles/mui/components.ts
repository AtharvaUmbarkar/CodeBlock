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
  MuiToolbar: {
    defaultProps: {},
    styleOverrides: {
      root: {
        backgroundColor: "white.main",
        accentColor: "white.main",
      },
    },
  },
  MuiUseMediaQuery: {
    defaultProps: {
      noSsr: true,
    },
  },
};

export default CodeBlockComponents;
