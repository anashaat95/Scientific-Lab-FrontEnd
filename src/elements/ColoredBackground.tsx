import { Box } from "@mui/material";
import React from "react";

export const ColoredBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100vh",
          width: "100vw",
          opacity: "0.3",
        },
      }}
    >
      {children}
    </Box>
  );
};
