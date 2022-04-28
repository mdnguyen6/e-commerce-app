import { createTheme } from "@mui/material/styles";

export type CustomTheme = {
    [Key in keyof typeof theme]: typeof theme[Key]
}

const theme = {
  bg: {
    main: "#F8AFA6",
    light: "#FADCD9",
    dark: "#F79489",
  },
  text: {
    main: "#F79489",
    light: "#FADCD9",
    dark: "#ef5350",
  },
};
export default createTheme(theme);
