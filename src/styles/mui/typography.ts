import { Palette } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

import montserrat from "@/fonts/montserrat";

const CodeBlockTypography: TypographyOptions | ((palette: Palette) => TypographyOptions) = {
  fontFamily: `${montserrat.style.fontFamily}`
};

export default CodeBlockTypography;
