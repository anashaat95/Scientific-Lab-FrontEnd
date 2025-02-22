import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { USERS_FRONTEND_ENDPOINT } from "../usersConsts";
import { IUser } from "../usersInterfaces";
import { getUserByIdService } from "../usersServicesBackEnd";
import DeleteUserForm from "./DeleteUserForm";

const DeleteUserFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString()]);
  if (!isAllowed) redirect(USERS_FRONTEND_ENDPOINT);

  const userData: IFetcherData = await fetcherFn(() => getUserByIdService(id));
  const user: IUser = userData.data?.data;
  if (!user) redirect(USERS_FRONTEND_ENDPOINT);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <DeleteUserForm id={id} />
    </Suspense>
  );
};

export default DeleteUserFormServer;
