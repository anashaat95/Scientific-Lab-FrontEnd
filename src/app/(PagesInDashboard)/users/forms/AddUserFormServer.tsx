import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IItemInSelect } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import { getCompaniesDepartmentsLabsSelectOptionsData } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { USERS_FRONTEND_ENDPOINT } from "../usersConsts";
import AddUserForm from "./AddUserForm";

const AddUserFormServer = async () => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString()]);
  if (!isAllowed) redirect(USERS_FRONTEND_ENDPOINT);

  const data: { companies: IItemInSelect[]; departments: IItemInSelect[]; labs: IItemInSelect[] } =
    await getCompaniesDepartmentsLabsSelectOptionsData();

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <AddUserForm {...data} />
    </Suspense>
  );
};

export default AddUserFormServer;
