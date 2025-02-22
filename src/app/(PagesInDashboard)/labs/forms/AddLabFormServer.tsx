import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IItemInSelect } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import { getDepartmentsUsersSelectOptionsData } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { LABS_FRONTEND_ENDPOINT } from "../labsConsts";
import AddLabForm from "./AddLabForm";

const AddLabFormServer = async () => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(LABS_FRONTEND_ENDPOINT);

  const data: { departments: IItemInSelect[]; users: IItemInSelect[] } = await getDepartmentsUsersSelectOptionsData();

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <AddLabForm {...data} />
    </Suspense>
  );
};

export default AddLabFormServer;
