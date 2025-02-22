import "server-only";

import { convertEnumToItemSelectArray } from "@/app/helpers";
import CustomLoader from "@/components/CustomLoader";
import { IItemInSelect } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import { getEquipmentsTechniciansSelectOptionsData } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { MAINTENANCE_LOGS_FRONTEND_ENDPOINT } from "../MaintenanceLogsConsts";
import { eMaintenanceLogStatus } from "../MaintenanceLogsInterfaces";
import AddMaintenanceLogForm from "./AddMaintenanceLogForm";

const AddMaintenanceLogFormServer = async () => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(MAINTENANCE_LOGS_FRONTEND_ENDPOINT);

  const data: { equipments: IItemInSelect[]; users: IItemInSelect[] } = await getEquipmentsTechniciansSelectOptionsData();
  const statuses = convertEnumToItemSelectArray(eMaintenanceLogStatus);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <AddMaintenanceLogForm {...data} statuses={statuses} />
    </Suspense>
  );
};

export default AddMaintenanceLogFormServer;
