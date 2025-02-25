import { createTheme } from "@mui/material";
import { blue, purple } from "@mui/material/colors";

const mainTheme = createTheme({
    colorSchemes:{
        light: true,
        dark: true,
    },
    palette:{
        primary:{
            main: blue[500],
            light: blue[500],
            dark: blue[900]
        },
        secondary:{
            main: purple[300],
            light: purple[300],
            dark: purple[900]
        }
    }
});

export default mainTheme;