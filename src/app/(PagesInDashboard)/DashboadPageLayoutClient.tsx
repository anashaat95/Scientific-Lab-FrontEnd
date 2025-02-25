"use client";
import DashboardContainer from "@/components/DashboardContainer";
import Header from "@/components/header/Header";
import ProgressBar from "@/components/ProgressBar";
import Sidebar from "@/components/sidebar/Sidebar";
import MainWrapper from "@/components/style/MainWrapper";
import PageWrapper from "@/components/style/PageWrapper";
import { login } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { Box } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./../globals.css";
import { IUser } from "./users/usersInterfaces";

const DashboardPageLayoutClient = ({ currentUser, children }: { currentUser: IUser; children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  dispatch(login(currentUser));

  return (
    <MainWrapper className="mainwrapper">
      <ToastContainer position="top-center" autoClose={2000} />
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
