import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

//colors
const darkColors = {
  primary: {
    100: "#dcd3f9",
    200: "#b8a7f3",
    300: "#957ced",
    400: "#7150e7",
    500: "#4e24e1",
    600: "#3e1db4",
    700: "#2f1687",
    800: "#1f0e5a",
    900: "#10072d",
  },
  secondary: {
    100: "#fffdff",
    200: "#fffbff",
    300: "#fefaff",
    400: "#fef8ff",
    500: "#fef6ff",
    600: "#cbc5cc",
    700: "#989499",
    800: "#666266",
    900: "#333133",
  },
  // grey: {
  //   100: "#fefefd",
  //   200: "#fdfdfb",
  //   300: "#fcfbfa",
  //   400: "#fbfaf8",
  //   500: "#faf9f6",
  //   600: "#c8c7c5",
  //   700: "#969594",
  //   800: "#646462",
  //   900: "#323231",
  // },

  grey: {
    100: "#d7d5da",
    200: "#afaab6",
    300: "#868091",
    400: "#5e556d",
    500: "#362b48",
    600: "#2b223a",
    700: "#201a2b",
    800: "#16111d",
    900: "#0b090e",
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
    100: "#10072d",
    200: "#1f0e5a",
    300: "#2f1687",
    400: "#3e1db4",
    500: "#4e24e1",
    600: "#7150e7",
    700: "#957ced",
    800: "#b8a7f3",
    900: "#dcd3f9",
  },
  secondary: {
    100: "#333133",
    200: "#666266",
    300: "#989499",
    400: "#cbc5cc",
    500: "#fef6ff",
    600: "#fef8ff",
    700: "#fefaff",
    800: "#fffbff",
    900: "#fffdff",
  },
  grey: {
    100: "#0b090e",
    200: "#16111d",
    300: "#201a2b",
    400: "#2b223a",
    500: "#362b48",
    600: "#5e556d",
    700: "#868091",
    800: "#afaab6",
    900: "#d7d5da",
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
              default: colors.primary[900],
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
              default: colors.secondary[700],
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
