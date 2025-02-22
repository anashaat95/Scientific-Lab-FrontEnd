import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData, IItemInSelect } from "@/interfaces";
import { fetcherFn, getCompaniesSelectOptionsData } from "@/services/sharedServices";
import { Suspense } from "react";

import { getIdFromDtoEntityUrl } from "@/app/helpers";
import { isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { DEPARTMENTS_FRONTEND_ENDPOINT } from "../departmentsConsts";
import { IDepartment, IEditDepartmentFormInput } from "../departmentsInterfaces";
import { getDepartmentByIdService } from "../departmentsServicesBackEnd";
import EditDepartmentForm from "./EditDepartmentForm";

const EditDepartmentFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(DEPARTMENTS_FRONTEND_ENDPOINT);

  const departmentData: IFetcherData = await fetcherFn(() => getDepartmentByIdService(id));
  const department: IDepartment = departmentData.data?.data;
  if (!department) redirect(DEPARTMENTS_FRONTEND_ENDPOINT);

  const data: { companies: IItemInSelect[] } = await getCompaniesSelectOptionsData();
  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <EditDepartmentForm {...data} department={ConvertDepartmentToEditDepartmentForm(department)} />
    </Suspense>
  );
};

const ConvertDepartmentToEditDepartmentForm = (department: IDepartment): IEditDepartmentFormInput => {
  return {
    id: department.id,
    name: department.name,
    location: department.location,
    company_id: getIdFromDtoEntityUrl(department.company_url),
  };
};

export default EditDepartmentFormServer;
