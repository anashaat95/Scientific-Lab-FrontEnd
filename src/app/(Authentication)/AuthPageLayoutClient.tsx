"use client";
import PageContainer from "@/components/container/PageContainer";
import Logo from "@/components/Logo";
import { ColoredBackground } from "@/elements/ColoredBackground";
import { Card, Grid } from "@mui/material";
import { IAuthPageLayout } from "./authInterfaces";

const AuthPageLayoutClient = ({ title, description, gridSizes, children }: IAuthPageLayout) => {
  return (
    <PageContainer title={title} description={description}>
      <ColoredBackground>
        <Grid container spacing={0} justifyContent="center" sx={{ height: "100vh" }}>
          {/* {isNetworkError && <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>} */}
          {/* {!isNetworkError && ( */}
          <Grid
            item
            xs={gridSizes?.xs ?? 12}
            sm={gridSizes?.sm ?? 8}
            md={gridSizes?.md ?? 6}
            lg={gridSizes?.lg ?? 4}
            xl={gridSizes?.xl ?? 3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "1200px" }}>
              <Logo />
              {children}
            </Card>
          </Grid>
          {/* )} */}
        </Grid>
      </ColoredBackground>
    </PageContainer>
  );
};

export default AuthPageLayoutClient;
