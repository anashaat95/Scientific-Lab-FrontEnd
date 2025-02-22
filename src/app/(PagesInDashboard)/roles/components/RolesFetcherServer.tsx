import CustomLoader from "@/components/CustomLoader";
import { isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import "server-only";
import { ROLES_FRONTEND_ENDPOINT } from "../rolesConsts";
import { enUserRoles } from "../rolesInterfaces";
import { getAllRolesService } from "../rolesServices";
import RolesTable from "./RolesTable";

const RolesFetcherServer = async () => {
  const hasAccess = await isAuthorized([enUserRoles.Admin.toString()]);
  if (!hasAccess) redirect(ROLES_FRONTEND_ENDPOINT);

  const data = await fetcherFn(getAllRolesService);

  return (
    <Suspense fallback={<CustomLoader />}>
      <RolesTable {...data} />
    </Suspense>
  );
};

export default RolesFetcherServer;
