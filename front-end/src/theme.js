import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

//colors

const darkColors = {
  primary: {
    100: "#e3dcfe",
    200: "#c7b9fc",
    300: "#ac97fb",
    400: "#9074f9",
    500: "#7451f8",
    600: "#5d41c6",
    700: "#463195",
    800: "#2e2063",
    900: "#171032",
  },
  grey: {
    100: "#fefbfb",
    200: "#fdf6f7",
    300: "#fbf2f4",
    400: "#faedf0",
    500: "#f9e9ec",
    600: "#c7babd",
    700: "#958c8e",
    800: "#645d5e",
    900: "#322f2f",
  },
  redAccent: {
    100: "#edd0d3",
    200: "#daa2a6",
    300: "#c8737a",
    400: "#b5454d",
    500: "#a31621",
    600: "#82121a",
    700: "#620d14",
    800: "#41090d",
    900: "#210407",
  },
  greenAccent: {
    100: "#ccfff3",
    200: "#99ffe8",
    300: "#66ffdc",
    400: "#33ffd1",
    500: "#00ffc5",
    600: "#00cc9e",
    700: "#009976",
    800: "#00664f",
    900: "#003327",
  },
  yellowAccent: {
    100: "#fef9e0",
    200: "#fdf2c1",
    300: "#fceca1",
    400: "#fbe582",
    500: "#fadf63",
    600: "#c8b24f",
    700: "#96863b",
    800: "#645928",
    900: "#322d14",
  },
  blueAccent: {
    100: "#d0e4ff",
    200: "#a1c9ff",
    300: "#73aeff",
    400: "#4493ff",
    500: "#1678ff",
    600: "#125ec0",
    700: "#0e439f",
    800: "#0a297f",
    900: "#051e40",
  },
};

const lightColors = {
  primary: {
    100: "#171032",
    200: "#2e2063",
    300: "#463195",
    400: "#5d41c6",
    500: "#7451f8",
    600: "#9074f9",
    700: "#ac97fb",
    800: "#c7b9fc",
    900: "#e3dcfe",
  },
  grey: {
    100: "#322f2f",
    200: "#645d5e",
    300: "#958c8e",
    400: "#c7babd",
    500: "#f9e9ec",
    600: "#faedf0",
    700: "#fbf2f4",
    800: "#fdf6f7",
    900: "#fefbfb",
  },
  redAccent: {
    100: "#210407",
    200: "#41090d",
    300: "#620d14",
    400: "#82121a",
    500: "#a31621",
    600: "#b5454d",
    700: "#c8737a",
    800: "#daa2a6",
    900: "#edd0d3",
  },
  greenAccent: {
    100: "#003327",
    200: "#00664f",
    300: "#009976",
    400: "#00cc9e",
    500: "#00ffc5",
    600: "#33ffd1",
    700: "#66ffdc",
    800: "#99ffe8",
    900: "#ccfff3",
  },
  yellowAccent: {
    100: "#322d14",
    200: "#645928",
    300: "#96863b",
    400: "#c8b24f",
    500: "#fadf63",
    600: "#fbe582",
    700: "#fceca1",
    800: "#fdf2c1",
    900: "#fef9e0",
  },
  blueAccent: {
    100: "#051e40",
    200: "#0a297f",
    300: "#0e439f",
    400: "#125ec0",
    500: "#1678ff",
    600: "#4493ff",
    700: "#73aeff",
    800: "#a1c9ff",
    900: "#d0e4ff",
  },
};

export const tokens = (mode) => ({
  ...(mode === "dark" ? darkColors : lightColors),
});

// MUI theme

export const ThemeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.blueAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[200],
            },
            secondary: {
              main: colors.blueAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.grey[900],
            },
          }),
    },
    typography: {
      fontFamily: ["Nunito", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Nunito", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

//context for color mode

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(ThemeSettings(mode)), [mode]);

  return [theme, colorMode];
};
