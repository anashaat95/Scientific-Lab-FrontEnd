import CustomLoader from "@/components/CustomLoader";
import { isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { COUNTRIES_FRONTEND_ENDPOINT } from "../countriesConsts";
import { getAllCountriesService } from "../countriesServicesBackEnd";
import CountriesTable from "./CountriesTable";

const CountriesFetcher = async () => {
  const hasAccess = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!hasAccess) redirect(COUNTRIES_FRONTEND_ENDPOINT);

  const data = await fetcherFn(getAllCountriesService);

  return (
    <Suspense fallback={<CustomLoader />}>
      <CountriesTable {...data} />
    </Suspense>
  );
};

export default CountriesFetcher;
