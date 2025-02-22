import AccessDeniedMessage from "@/components/AccessDeniedMessage";
import PageContainer from "@/components/container/PageContainer";
import CustomLoader from "@/components/CustomLoader";
import { PageTitle } from "@/components/PageTitle";
import { isAuthorized } from "@/services/jwtTokenService";
import { Box } from "@mui/material";
import React, { Suspense } from "react";
import { enUserRoles } from "../roles/rolesInterfaces";
import CompaniesFetcher from "./components/CompaniesFetcherServer";

const CompaniesLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const hasAccess = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <PageContainer title="Companies" description="this is companies page">
        <Box display="flex" flexDirection="column" gap={2} alignItems="center" width="100%">
          {!hasAccess && <AccessDeniedMessage />}
          {hasAccess && (
            <>
              <PageTitle title="Companies" />
              <CompaniesFetcher />
              {children}
            </>
          )}
        </Box>
      </PageContainer>
    </Suspense>
  );
};

export default CompaniesLayout;
