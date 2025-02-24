import { formatDate, getIdFromDtoEntityUrl } from "@/app/helpers";
import CustomMessage from "@/components/CustomMessage";
import CustomTable from "@/components/table/CustomTable";
import CustomTableCell from "@/components/table/CustomTableCell";
import CustomTableContentRow from "@/components/table/CustomTableContentRow";
import { IFetcherData } from "@/interfaces";
import { GetJwtTokenPayload, isAuthorized } from "@/services/jwtTokenService";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { MAINTENANCE_LOGS_FRONTEND_ENDPOINT } from "../MaintenanceLogsConsts";
import { IMaintenanceLog } from "../MaintenanceLogsInterfaces";

const tableHeader: Array<string> = ["Equipment", "Technician", "Description", "Status", "Created", "Updated", ""];

const MaintenanceLogsTable = async ({ data, errorMessage, isNetworkError }: IFetcherData) => {
  if (isNetworkError) {
    return <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>;
  }

  const token = await GetJwtTokenPayload();
  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const canAddUpdate = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);

  const maintenanceLogs: IMaintenanceLog[] = data?.data;

  return (
    <CustomTable cellHeads={tableHeader} isPending={false} endpoint={MAINTENANCE_LOGS_FRONTEND_ENDPOINT} addAction={canAddUpdate}>
      {maintenanceLogs?.map((maintenanceLog) => (
        <CustomTableContentRow
          key={maintenanceLog.id}
          endpoint={MAINTENANCE_LOGS_FRONTEND_ENDPOINT}
          id={maintenanceLog.id}
          updateAction={isAdmin || (canAddUpdate && token?.nameid === getIdFromDtoEntityUrl(maintenanceLog.technician_url))}
          deleteAction={isAdmin}
        >
          <CustomTableCell>{maintenanceLog.equipment_name}</CustomTableCell>
          <CustomTableCell>{maintenanceLog.technician_name}</CustomTableCell>
          <CustomTableCell>{maintenanceLog.description}</CustomTableCell>
          <CustomTableCell>{maintenanceLog.status}</CustomTableCell>

          <CustomTableCell>{formatDate(maintenanceLog.created_at)}</CustomTableCell>
          <CustomTableCell>{formatDate(maintenanceLog.updated_at)}</CustomTableCell>
        </CustomTableContentRow>
      ))}
    </CustomTable>
  );
};

export default MaintenanceLogsTable;
