import styled from "@emotion/styled";
import React from "react";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  padding: "20px",
}));
export default React.memo(MainWrapper);
