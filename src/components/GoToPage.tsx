import { Typography } from "@mui/material";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

interface IGoToProps {
  href?: string;
  children?: React.ReactNode;
  target?: HTMLAttributeAnchorTarget;
}

export const GoToPage = ({ href = "/dashboard", children = <>Home</>, target }: IGoToProps) => {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }} target={target || "_self"}>
      <Typography
        variant="h6"
        fontWeight={500}
        sx={{ "&:hover": { color: "#0085db", textShadow: "2px 2px 5px rgba(0, 133, 219, 0.5)", fontWeight: "800" } }}
      >
        {children}
      </Typography>
    </Link>
  );
};
