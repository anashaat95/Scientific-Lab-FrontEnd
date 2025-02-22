import styled from "@emotion/styled";
import React from "react";

const PageWrapper = styled("div")((x) => {
  return {
    position: "relative",
    display: "flex",
    flexGrow: 1,
    paddingBottom: "60px",
    flexDirection: "column",
    zIndex: 1,
    backgroundColor: "transparent",
  };
});

export default React.memo(PageWrapper);
