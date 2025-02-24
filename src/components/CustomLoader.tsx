"use client";

import { Box, CircularProgress } from "@mui/material";

const CustomLoader = ({ page = false, color = undefined }: { color?: string; page?: Boolean }) => {
  let sxProps = {};

  if (page) {
    sxProps = {
      marginTop: "6px",
      // position: "fixed",
      // top: 0,
      // left: 0,
      width: "100vw",
      height: "70vh",
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
      // backgroundColor: "rgba(255, 255, 255, 0.7)",
      // backdropFilter: "blur(2px)",
      // zIndex: 9999,
      // pointerEvents: "none",
    };
  } else {
    sxProps = { height: "100%", width: "100%" };
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: 5000, ...sxProps }}>
      <CircularProgress sx={{ fontSize: "12px", color: color || "primary.main" }} />
    </Box>
  );
};

export default CustomLoader;
