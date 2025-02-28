import CustomMessage from "@/components/CustomMessage";
import StartAddElementRightNow from "@/components/StartAddElementRightNow";
import CustomTable from "@/components/table/CustomTable";
import CustomTableCell from "@/components/table/CustomTableCell";
import CustomTableContentRow from "@/components/table/CustomTableContentRow";
import { IFetcherData } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import { Chip } from "@mui/material";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { EQUIPMENTS_FRONTEND_ENDPOINT } from "../equipmentsConsts";
import { eEquipmentStatus, IEquipment, stringToEquipmentStatus } from "../equipmentsInterfaces";
import EquipmentImage from "./EquipmentImage";

const tableHeader: Array<string> = ["", "Name", "Total", "Bookings", "Status", "Overnight", "Company", ""];

const EquipmentsTable = async ({ data, errorMessage, isNetworkError }: IFetcherData) => {
  if (isNetworkError) {
    return <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>;
  }

  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const canAddUpdate = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);

  const equipments: IEquipment[] = data?.data;

  if (equipments?.length === 0) return <StartAddElementRightNow title="Equipments" endpoint={EQUIPMENTS_FRONTEND_ENDPOINT} />;

  return (
    <CustomTable cellHeads={tableHeader} isPending={false} endpoint={EQUIPMENTS_FRONTEND_ENDPOINT} addAction={canAddUpdate}>
      {equipments?.map((equipment) => (
        <CustomTableContentRow
          key={equipment.id}
          endpoint={EQUIPMENTS_FRONTEND_ENDPOINT}
          id={equipment.id}
          deleteAction={isAdmin}
          updateAction={canAddUpdate}
        >
          <CustomTableCell>
            <EquipmentImage equipment={equipment} />
          </CustomTableCell>
          <CustomTableCell sx={{ fontWeight: "700" }}>{equipment.name}</CustomTableCell>
          <CustomTableCell>{equipment.total_quantity}</CustomTableCell>
          <CustomTableCell>
            <strong>{equipment.reserved_quantity}</strong>
          </CustomTableCell>
          <CustomTableCell>
            <EquipmentStatusChip status={stringToEquipmentStatus(equipment.status)} />
          </CustomTableCell>
          {/* <CustomTableCell>{dayjs(equipment.purchase_date).format("MMM D, YYYY")}</CustomTableCell>
          <CustomTableCell>{equipment.serial_number}</CustomTableCell> */}
          <CustomTableCell>{equipment.can_be_left_overnight === "True" ? "Yes" : "No"}</CustomTableCell>
          <CustomTableCell>{equipment.company_name}</CustomTableCell>
        </CustomTableContentRow>
      ))}
    </CustomTable>
  );
};

export default EquipmentsTable;

const getStatusProps = (status: eEquipmentStatus) => {
  switch (status) {
    case eEquipmentStatus.Available:
      return { label: "Available", color: "success" };
    case eEquipmentStatus.Decommissioned:
      return { label: "Decommissioned", color: "default" };
    case eEquipmentStatus.InMaintenance:
      return { label: "In Maintenance", color: "info" };
    default:
      return { label: "Unknown", color: "default" };
  }
};

interface EquipmentStatusChipProps {
  status: eEquipmentStatus;
}

export const EquipmentStatusChip: React.FC<EquipmentStatusChipProps> = ({ status }) => {
  const { label, color } = getStatusProps(status);

  return <Chip label={label} color={color as any} variant={`${status === eEquipmentStatus.Available ? "filled" : "outlined"}`} />;
};
