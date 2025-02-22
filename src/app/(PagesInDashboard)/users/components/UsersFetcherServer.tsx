import CustomLoader from "@/components/CustomLoader";
import { isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { USERS_FRONTEND_ENDPOINT } from "../usersConsts";
import { getAllUsersService } from "../usersServicesBackEnd";
import UsersTable from "./UsersTable";

const UsersFetcher = async () => {
  const hasAccess = await isAuthorized([enUserRoles.Admin.toString()]);
  if (!hasAccess) redirect(USERS_FRONTEND_ENDPOINT);

  const data = await fetcherFn(getAllUsersService);

  return (
    <Suspense fallback={<CustomLoader />}>
      <UsersTable {...data} />
    </Suspense>
  );
};

export default UsersFetcher;
