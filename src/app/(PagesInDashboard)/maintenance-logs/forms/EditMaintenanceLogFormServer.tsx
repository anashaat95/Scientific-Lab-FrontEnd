import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData, IItemInSelect } from "@/interfaces";
import { fetcherFn, getEquipmentsTechniciansSelectOptionsData } from "@/services/sharedServices";
import { Suspense } from "react";

import { convertEnumToItemSelectArray, getIdFromDtoEntityUrl } from "@/app/helpers";
import { GetJwtTokenPayload, isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { MAINTENANCE_LOGS_FRONTEND_ENDPOINT } from "../MaintenanceLogsConsts";
import { eMaintenanceLogStatus, IEditMaintenanceLogFormInput, IMaintenanceLog } from "../MaintenanceLogsInterfaces";
import { getMaintenanceLogByIdService } from "../MaintenanceLogsServicesBackEnd";
import EditMaintenanceLogForm from "./EditMaintenanceLogForm";

const EditMaintenanceLogFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(MAINTENANCE_LOGS_FRONTEND_ENDPOINT);

  const maintenanceLogData: IFetcherData = await fetcherFn(() => getMaintenanceLogByIdService(id));
  const maintenanceLog: IMaintenanceLog = maintenanceLogData.data?.data;

  if (!maintenanceLog) redirect(MAINTENANCE_LOGS_FRONTEND_ENDPOINT);

  const token = await GetJwtTokenPayload();
  const isCreatedByUser = token?.nameid === getIdFromDtoEntityUrl(maintenanceLog.technician_url);
  if (!isCreatedByUser && !isAllowed) redirect(MAINTENANCE_LOGS_FRONTEND_ENDPOINT);

  const data: { equipments: IItemInSelect[]; users: IItemInSelect[] } = await getEquipmentsTechniciansSelectOptionsData();
  const statuses = convertEnumToItemSelectArray(eMaintenanceLogStatus);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <EditMaintenanceLogForm {...data} statuses={statuses} maintenanceLog={ConvertMaintenanceLogToEditMaintenanceLogForm(maintenanceLog)} />
    </Suspense>
  );
};

const ConvertMaintenanceLogToEditMaintenanceLogForm = (maintenanceLog: IMaintenanceLog): IEditMaintenanceLogFormInput => {
  return {
    id: maintenanceLog.id,
    description: maintenanceLog.description,
    status: eMaintenanceLogStatus[maintenanceLog.status as keyof typeof eMaintenanceLogStatus],
    equipment_id: getIdFromDtoEntityUrl(maintenanceLog.equipment_url),
    technician_id: getIdFromDtoEntityUrl(maintenanceLog.technician_url),
  };
};

export default EditMaintenanceLogFormServer;
