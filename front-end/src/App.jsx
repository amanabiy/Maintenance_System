import React from "react";
import { RouterProvider } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import router from "./routing/router";

function App() {
  const [theme, colorMode] = useMode();
  console.log(theme);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Rerenders twice in dev but once in prod */}
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
