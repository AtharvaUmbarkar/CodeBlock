import { PaletteOptions } from "mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
    black: Palette["primary"];
    gray: Palette["primary"];
  }

  interface PaletteColor {
    darker?:string,
  }

  interface PaletteOptions {
    white?: PaletteOptions["primary"];
    black?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}
