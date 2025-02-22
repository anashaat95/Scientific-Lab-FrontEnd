import CustomLoader from "@/components/CustomLoader";
import { isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { COMPANIES_FRONTEND_ENDPOINT } from "../companiesConsts";
import { getAllCompaniesService } from "../companiesServicesBackEnd";
import CompaniesTable from "./CompaniesTable";

const CompaniesFetcher = async () => {
  const hasAccess = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!hasAccess) redirect(COMPANIES_FRONTEND_ENDPOINT);

  const data = await fetcherFn(getAllCompaniesService);

  return (
    <Suspense fallback={<CustomLoader />}>
      <CompaniesTable {...data} />
    </Suspense>
  );
};

export default CompaniesFetcher;
