"use client";
import DashboardContainer from "@/components/DashboardContainer";
import Header from "@/components/header/Header";
import ProgressBar from "@/components/ProgressBar";
import Sidebar from "@/components/sidebar/Sidebar";
import MainWrapper from "@/components/style/MainWrapper";
import PageWrapper from "@/components/style/PageWrapper";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import "./../globals.css";
import { IUser } from "./users/usersInterfaces";

const DashboardPageLayoutClient = ({ currentUser, children }: { currentUser: IUser; children: React.ReactNode }) => {
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <MainWrapper className="mainwrapper">
      <ProgressBar />
      <Sidebar />
      <PageWrapper className="page-wrapper">
        <DashboardContainer>
          <Header />
          <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" sx={{ minHeight: "calc(100vh - 170px)", py: 3 }}>
            {children}
          </Box>
        </DashboardContainer>
      </PageWrapper>
    </MainWrapper>
  );
};

export default DashboardPageLayoutClient;
