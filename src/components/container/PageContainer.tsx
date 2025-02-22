"use client";

import { Box } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";

type Props = {
  description?: string;
  children: React.JSX.Element | React.JSX.Element[];
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => {
  return (
    <Box width="100%">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </Box>
  );
};

export default PageContainer;
