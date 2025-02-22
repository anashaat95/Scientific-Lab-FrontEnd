import CustomMessage from "@/components/CustomMessage";
import CustomTable from "@/components/table/CustomTable";
import CustomTableCell from "@/components/table/CustomTableCell";
import CustomTableContentRow from "@/components/table/CustomTableContentRow";
import { IFetcherData } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import dayjs from "dayjs";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { COUNTRIES_FRONTEND_ENDPOINT } from "../countriesConsts";
import { ICountry } from "../countriesInterfaces";

const tableHeader: Array<string> = ["Name", "Created", "Updated", ""];

const CountriesTable = async ({ data, errorMessage, isNetworkError }: IFetcherData) => {
  if (isNetworkError) {
    return <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>;
  }
  const countries: ICountry[] = data?.data;

  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const canAddEdit = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);

  return (
    <CustomTable cellHeads={tableHeader} isPending={false} endpoint={COUNTRIES_FRONTEND_ENDPOINT} addAction={canAddEdit}>
      {countries?.map((country) => (
        <CustomTableContentRow key={country.id} endpoint={COUNTRIES_FRONTEND_ENDPOINT} id={country.id} deleteAction={isAdmin} editAction={canAddEdit}>
          <CustomTableCell sx={{ fontWeight: 700 }}>{country.name}</CustomTableCell>
          <CustomTableCell>{dayjs(country.created_at).format("MMM D, YYYY")}</CustomTableCell>
          <CustomTableCell>{dayjs(country.updated_at).format("MMM D, YYYY")}</CustomTableCell>
        </CustomTableContentRow>
      ))}
    </CustomTable>
  );
};

export default CountriesTable;
