"use client";
import PageContainer from "@/components/container/PageContainer";
import Logo from "@/components/Logo";
import { GoToButton } from "@/elements/CustomButtons";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import BgMain from "./../../public/images/backgrounds/bg-main.jpeg";

const MainPage = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));

  return (
    <PageContainer title="Pharmaceutics Lab" description="This is the website for bookings related to pharmaceutics lab">
      <Box
        sx={{
          backgroundImage: `url(${BgMain.src})`, // Use the image as the background
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          objectFit: "contain",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: `${lgUp ? "space-between" : "center"}`,
            alignItems: "center",
            height: "100%",
            flexWrap: "wrap",
          }}
        >
          <Logo sx={{ margin: "12px 24px" }} />

          <Box sx={{ display: "flex", justifyContent: `${lgUp ? "space-between" : "center"}`, alignItems: "center", gap: 2, mr: "24px" }}>
            <GoToButton href="register">SignUp</GoToButton>
            <GoToButton href="login">Login</GoToButton>
          </Box>
        </Box>
        <Box
          sx={{
            margin: "250px auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={8} // Optional: adds a shadow effect
            sx={{
              padding: 4, // Adds padding inside the Paper
              maxWidth: "800px", // Optional: sets a maximum width for content
              width: "100%",
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
            }}
          >
            <Typography variant="h1" fontWeight="700" fontSize={lgDown ? "2rem" : "4rem"} lineHeight="1.2" color="#0074BA">
              Welcome To Pharmaceutics Lab
            </Typography>
          </Paper>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default MainPage;
