import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";

import { getIdFromDtoEntityUrl } from "@/app/helpers";
import { GetJwtTokenPayload, isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { MAINTENANCE_LOGS_FRONTEND_ENDPOINT } from "../MaintenanceLogsConsts";
import { IMaintenanceLog } from "../MaintenanceLogsInterfaces";
import { getMaintenanceLogByIdService } from "../MaintenanceLogsServicesBackEnd";
import DeleteMaintenanceLogForm from "./DeleteMaintenanceLogForm";

const DeleteMaintenanceLogFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString()]);
  if (!isAllowed) redirect(MAINTENANCE_LOGS_FRONTEND_ENDPOINT);

  const maintenanceLogData: IFetcherData = await fetcherFn(() => getMaintenanceLogByIdService(id));
  const maintenanceLog: IMaintenanceLog = maintenanceLogData.data?.data;
  if (!maintenanceLog) redirect(MAINTENANCE_LOGS_FRONTEND_ENDPOINT);

  const token = await GetJwtTokenPayload();
  const isCreatedByUser = token?.sub === getIdFromDtoEntityUrl(maintenanceLog.technician_url);
  if (!isCreatedByUser && !isAllowed) redirect(MAINTENANCE_LOGS_FRONTEND_ENDPOINT);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <DeleteMaintenanceLogForm id={id} />
    </Suspense>
  );
};
export default DeleteMaintenanceLogFormServer;
