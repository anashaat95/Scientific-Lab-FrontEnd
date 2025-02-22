import { Typography } from "@mui/material";
import React from "react";

interface IHeadingText {
  textAlign?: string;
  varient?: "h6" | "h4" | "h2";
  children: React.ReactNode;
}

export const HeadingText = ({ textAlign = "center", varient = "h6", children }: IHeadingText) => {
  switch (varient) {
    case "h2":
      return <H2Text textAlign={textAlign}>{children}</H2Text>;
    case "h4":
      return <H4Text textAlign={textAlign}>{children}</H4Text>;
    case "h6":
      return <H6Text textAlign={textAlign}>{children}</H6Text>;

    default:
      return <H6Text textAlign={textAlign}>{children}</H6Text>;
  }
};

const H6Text = ({ textAlign, children }: IHeadingText) => {
  return (
    <Typography color="textSecondary" variant="h6" fontWeight="400" sx={{ textAlign: textAlign ?? "center" }}>
      {children}
    </Typography>
  );
};

const H4Text = ({ textAlign, children }: IHeadingText) => {
  return (
    <Typography color="textSecondary" variant="h4" fontWeight="600" sx={{ textAlign: textAlign ?? "center" }}>
      {children}
    </Typography>
  );
};

const H2Text = ({ textAlign, children }: IHeadingText) => {
  return (
    <Typography fontWeight="700" variant="h2" sx={{ textAlign: textAlign ?? "center" }}>
      {children}
    </Typography>
  );
};
