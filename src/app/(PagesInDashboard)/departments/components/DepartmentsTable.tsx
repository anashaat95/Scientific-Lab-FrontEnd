import { formatDate } from "@/app/helpers";
import CustomMessage from "@/components/CustomMessage";
import StartAddElementRightNow from "@/components/StartAddElementRightNow";
import CustomTable from "@/components/table/CustomTable";
import CustomTableCell from "@/components/table/CustomTableCell";
import CustomTableContentRow from "@/components/table/CustomTableContentRow";
import { IFetcherData } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { DEPARTMENTS_FRONTEND_ENDPOINT } from "../departmentsConsts";
import { IDepartment } from "../departmentsInterfaces";

const tableHeader: Array<string> = ["Name", "Location", "Created", "Updated", ""];

const DepartmentsTable = async ({ data, errorMessage, isNetworkError }: IFetcherData) => {
  if (isNetworkError) {
    return <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>;
  }

  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const canAddUpdate = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);

  const departments: IDepartment[] = data?.data;

  if (departments?.length === 0) return <StartAddElementRightNow title="Departments" endpoint={DEPARTMENTS_FRONTEND_ENDPOINT} />;

  return (
    <CustomTable cellHeads={tableHeader} isPending={false} endpoint={DEPARTMENTS_FRONTEND_ENDPOINT} addAction={canAddUpdate}>
      {departments?.map((department) => (
        <CustomTableContentRow
          key={department.id}
          endpoint={DEPARTMENTS_FRONTEND_ENDPOINT}
          id={department.id}
          deleteAction={isAdmin}
          updateAction={canAddUpdate}
        >
          <CustomTableCell sx={{ fontWeight: 700 }}>
            {department.name} - {department.company_name}
          </CustomTableCell>
          <CustomTableCell>{department.location}</CustomTableCell>
          <CustomTableCell>{formatDate(department.created_at)}</CustomTableCell>
          <CustomTableCell>{formatDate(department.updated_at)}</CustomTableCell>
        </CustomTableContentRow>
      ))}
    </CustomTable>
  );
};

export default DepartmentsTable;
