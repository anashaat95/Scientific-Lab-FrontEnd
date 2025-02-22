import CustomLoader from "@/components/CustomLoader";
import { isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { LABS_FRONTEND_ENDPOINT } from "../labsConsts";
import { getAllLabsService } from "../labsServicesBackEnd";
import LabsTable from "./LabsTable";

const LabsFetcher = async () => {
  const hasAccess = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!hasAccess) redirect(LABS_FRONTEND_ENDPOINT);

  const data = await fetcherFn(getAllLabsService);

  return (
    <Suspense fallback={<CustomLoader />}>
      <LabsTable {...data} />
    </Suspense>
  );
};

export default LabsFetcher;
