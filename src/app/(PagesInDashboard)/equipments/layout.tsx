import PageContainer from "@/components/container/PageContainer";
import CustomLoader from "@/components/CustomLoader";
import { PageTitle } from "@/components/PageTitle";
import { Box } from "@mui/material";
import React, { Suspense } from "react";
import EquipmentsFetcher from "./components/EquipmentsFetcherServer";
const EquipmentsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <PageContainer title="Equipments" description="this is labs page">
        <Box display="flex" flexDirection="column" gap={2} alignItems="center" width="100%">
          <PageTitle title="Equipments" />
          <EquipmentsFetcher />
          {children}
        </Box>
      </PageContainer>
    </Suspense>
  );
};

export default EquipmentsLayout;
