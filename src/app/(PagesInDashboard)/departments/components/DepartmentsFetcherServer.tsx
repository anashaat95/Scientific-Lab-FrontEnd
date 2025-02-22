import CustomLoader from "@/components/CustomLoader";
import { isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { DEPARTMENTS_FRONTEND_ENDPOINT } from "../departmentsConsts";
import { getAllDepartmentsService } from "../departmentsServicesBackEnd";
import DepartmentsTable from "./DepartmentsTable";

const DepartmentsFetcher = async () => {
  const hasAccess = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!hasAccess) redirect(DEPARTMENTS_FRONTEND_ENDPOINT);

  const data = await fetcherFn(getAllDepartmentsService);

  return (
    <Suspense fallback={<CustomLoader />}>
      <DepartmentsTable {...data} />
    </Suspense>
  );
};

export default DepartmentsFetcher;
