import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IItemInSelect } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import { getCompaniesSelectOptionsData } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { DEPARTMENTS_FRONTEND_ENDPOINT } from "../departmentsConsts";
import AddDepartmentForm from "./AddDepartmentForm";

const AddDepartmentFormServer = async () => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(DEPARTMENTS_FRONTEND_ENDPOINT);

  const data: { companies: IItemInSelect[] } = await getCompaniesSelectOptionsData();

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <AddDepartmentForm {...data} />
    </Suspense>
  );
};

export default AddDepartmentFormServer;
