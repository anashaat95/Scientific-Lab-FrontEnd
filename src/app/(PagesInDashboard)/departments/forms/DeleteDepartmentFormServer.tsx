import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";

import { isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { DEPARTMENTS_FRONTEND_ENDPOINT } from "../departmentsConsts";
import { IDepartment } from "../departmentsInterfaces";
import { getDepartmentByIdService } from "../departmentsServicesBackEnd";
import DeleteDepartmentForm from "./DeleteDepartmentForm";

const DeleteDepartmentFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString()]);
  if (!isAllowed) redirect(DEPARTMENTS_FRONTEND_ENDPOINT);

  const departmentData: IFetcherData = await fetcherFn(() => getDepartmentByIdService(id));
  const department: IDepartment = departmentData.data?.data;
  if (!department) redirect(DEPARTMENTS_FRONTEND_ENDPOINT);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <DeleteDepartmentForm id={id} />
    </Suspense>
  );
};

export default DeleteDepartmentFormServer;
