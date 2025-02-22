import CustomLoader from "@/components/CustomLoader";
import { isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { CITIES_FRONTEND_ENDPOINT } from "../citiesConsts";
import { getAllCitiesService } from "../citiesServicesBackEnd";
import CitiesTable from "./CitiesTable";

const CitiesFetcher = async () => {
  const hasAccess = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!hasAccess) redirect(CITIES_FRONTEND_ENDPOINT);

  const data = await fetcherFn(getAllCitiesService);

  return (
    <Suspense fallback={<CustomLoader />}>
      <CitiesTable {...data} />
    </Suspense>
  );
};

export default CitiesFetcher;
