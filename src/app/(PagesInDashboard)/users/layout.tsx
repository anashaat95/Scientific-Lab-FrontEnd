import AccessDeniedMessage from "@/components/AccessDeniedMessage";
import PageContainer from "@/components/container/PageContainer";
import CustomLoader from "@/components/CustomLoader";
import { PageTitle } from "@/components/PageTitle";
import { isAuthorized } from "@/services/jwtTokenService";
import { Box } from "@mui/material";
import React, { Suspense } from "react";
import { enUserRoles } from "../roles/rolesInterfaces";
import UsersFetcher from "./components/UsersFetcherServer";

const UsersLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const hasAccess = await isAuthorized([enUserRoles.Admin.toString()]);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <PageContainer title="Users" description="this is users page">
        <Box display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center" width="100%">
          {!hasAccess && <AccessDeniedMessage />}
          {hasAccess && (
            <>
              <PageTitle title="Users" />
              <UsersFetcher />
              {children}
            </>
          )}
        </Box>
      </PageContainer>
    </Suspense>
  );
};

export default UsersLayout;
