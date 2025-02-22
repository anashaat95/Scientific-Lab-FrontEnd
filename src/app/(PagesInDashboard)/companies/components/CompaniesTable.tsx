import CustomMessage from "@/components/CustomMessage";
import { GoToPage } from "@/components/GoToPage";
import CustomTable from "@/components/table/CustomTable";
import CustomTableCell from "@/components/table/CustomTableCell";
import CustomTableContentRow from "@/components/table/CustomTableContentRow";
import { IFetcherData } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { COMPANIES_FRONTEND_ENDPOINT } from "../companiesConsts";
import { ICompany } from "../companiesInterfaces";
const flexCenter = { display: "flex", alignItems: "center", gap: 1 };

const tableHeader: Array<string> = ["Name", "Location", "Zip Code", "Website", "Created", "Updated", ""];

const CompaniesTable = async ({ data, errorMessage, isNetworkError }: IFetcherData) => {
  if (isNetworkError) {
    return <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>;
  }
  const companies: ICompany[] = data?.data;

  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const canAddEdit = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);

  return (
    <CustomTable cellHeads={tableHeader} isPending={false} endpoint={COMPANIES_FRONTEND_ENDPOINT} addAction={canAddEdit}>
      {companies?.map((company) => (
        <CustomTableContentRow key={company.id} endpoint={COMPANIES_FRONTEND_ENDPOINT} id={company.id} editAction={canAddEdit} deleteAction={isAdmin}>
          <CustomTableCell sx={{ fontWeight: 700 }}>{company.name}</CustomTableCell>
          <CustomTableCell>
            {company.street}, {company.city_name}, {company.country_name}
          </CustomTableCell>
          <CustomTableCell>{company.zipCode}</CustomTableCell>
          <CustomTableCell>
            <GoToPage href={company.website || undefined} target="_blank">
              <IconButton color="primary">
                <ArrowOutwardIcon />
              </IconButton>
            </GoToPage>
          </CustomTableCell>
          <CustomTableCell>{dayjs(company.created_at).format("MMM D, YYYY")}</CustomTableCell>
          <CustomTableCell>{dayjs(company.updated_at).format("MMM D, YYYY")}</CustomTableCell>
        </CustomTableContentRow>
      ))}
    </CustomTable>
  );
};

export default CompaniesTable;
