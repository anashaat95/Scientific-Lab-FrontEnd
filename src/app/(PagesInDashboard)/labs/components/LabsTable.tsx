import { convertTimeInAMorPM, formatDate, getIdFromDtoEntityUrl } from "@/app/helpers";
import CustomMessage from "@/components/CustomMessage";
import StartAddElementRightNow from "@/components/StartAddElementRightNow";
import CustomTable from "@/components/table/CustomTable";
import CustomTableCell from "@/components/table/CustomTableCell";
import CustomTableContentRow from "@/components/table/CustomTableContentRow";
import { IFetcherData } from "@/interfaces";
import { GetJwtTokenPayload, isAuthorized } from "@/services/jwtTokenService";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { LABS_FRONTEND_ENDPOINT } from "../labsConsts";
import { ILab } from "../labsInterfaces";

const tableHeader: Array<string> = ["Name", "Capacity", "Working Period", "Supervisor", "Created", "Updated", ""];

const LabsTable = async ({ data, errorMessage, isNetworkError }: IFetcherData) => {
  if (isNetworkError) {
    return <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>;
  }
  const token = await GetJwtTokenPayload();
  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const canAddUpdate = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);

  const labs: ILab[] = data?.data;

  if (labs?.length === 0) return <StartAddElementRightNow title="Labs" endpoint={LABS_FRONTEND_ENDPOINT} />;

  return (
    <CustomTable cellHeads={tableHeader} isPending={false} endpoint={LABS_FRONTEND_ENDPOINT} addAction={canAddUpdate}>
      {labs?.map((lab) => (
        <CustomTableContentRow
          key={lab.id}
          endpoint={LABS_FRONTEND_ENDPOINT}
          id={lab.id}
          deleteAction={isAdmin}
          updateAction={isAdmin || (canAddUpdate && token?.sub === getIdFromDtoEntityUrl(lab.supervisor_url))}
        >
          <CustomTableCell sx={{ fontWeight: "700" }}>
            {lab.name} - {lab.department_name}
          </CustomTableCell>
          <CustomTableCell>{lab.capacity}</CustomTableCell>
          <CustomTableCell>
            {convertTimeInAMorPM(lab.opening_time.slice(0, 5))} - {convertTimeInAMorPM(lab.closing_time.slice(0, 5))}
          </CustomTableCell>
          <CustomTableCell>{lab.supervisor_name}</CustomTableCell>
          <CustomTableCell>{formatDate(lab.created_at)}</CustomTableCell>
          <CustomTableCell>{formatDate(lab.updated_at)}</CustomTableCell>
        </CustomTableContentRow>
      ))}
    </CustomTable>
  );
};

export default LabsTable;
