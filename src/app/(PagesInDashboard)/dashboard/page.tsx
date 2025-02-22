"use client";
import PageContainer from "@/components/container/PageContainer";
import CustomLoader from "@/components/CustomLoader";
import { PageTitle } from "@/components/PageTitle";
import { UnderConstruction } from "@/components/UnderConstruction";
import { Box } from "@mui/material";
import { Suspense } from "react";
const Dashboard = () => {
  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <PageContainer title="Dashboard" description="this is Dashboard page">
        <PageTitle title="Dashboard" />
        <Box display="flex" flexDirection="column" gap={2} alignItems="center" width="100%">
          <UnderConstruction />
        </Box>
      </PageContainer>
    </Suspense>
  );
};

export default Dashboard;
