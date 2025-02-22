import PageContainer from "@/components/container/PageContainer";
import CustomLoader from "@/components/CustomLoader";
import { PageTitle } from "@/components/PageTitle";
import { Box } from "@mui/material";
import React, { Suspense } from "react";
import MaintenanceLogsFetcher from "./components/MaintenanceLogsFetcherServer";

const MaintenanceLogLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <PageContainer title="Maintenance Logs" description="this is maintenance logs page">
        <Box display="flex" flexDirection="column" gap={2} alignItems="center" width="100%">
          <PageTitle title="Maintenance Log" />
          <MaintenanceLogsFetcher />
          {children}
        </Box>
      </PageContainer>
    </Suspense>
  );
};

export default MaintenanceLogLayout;
