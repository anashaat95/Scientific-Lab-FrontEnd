import AccessDeniedMessage from "@/components/AccessDeniedMessage";
import PageContainer from "@/components/container/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { isAuthorized } from "@/services/jwtTokenService";
import { Box } from "@mui/material";
import React from "react";
import "server-only";
import RolesFetcherServer from "./components/RolesFetcherServer";
import { enUserRoles } from "./rolesInterfaces";

const Roles: React.FC<{ children?: React.ReactNode }> = async ({ children }) => {
  const hasAccess = await isAuthorized([enUserRoles.Admin.toString()]);
  return (
    <PageContainer title="Roles" description="this is roles page">
      <Box display="flex" flexDirection="column" gap={2} alignItems="center" width="100%">
        {!hasAccess && <AccessDeniedMessage />}
        {hasAccess && (
          <>
            <PageTitle title="Roles" />
            <RolesFetcherServer />
            {children}
          </>
        )}
      </Box>
    </PageContainer>
  );
};

export default Roles;
