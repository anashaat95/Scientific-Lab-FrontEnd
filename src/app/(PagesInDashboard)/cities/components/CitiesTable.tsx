import CustomMessage from "@/components/CustomMessage";
import StartAddElementRightNow from "@/components/StartAddElementRightNow";
import CustomTable from "@/components/table/CustomTable";
import CustomTableCell from "@/components/table/CustomTableCell";
import CustomTableContentRow from "@/components/table/CustomTableContentRow";
import { IFetcherData } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import dayjs from "dayjs";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { CITIES_FRONTEND_ENDPOINT } from "../citiesConsts";
import { ICity } from "../citiesInterfaces";

const tableHeader: Array<string> = ["Name", "Created", "Updated", ""];

const CitiesTable = async ({ data, errorMessage, isNetworkError }: IFetcherData) => {
  if (isNetworkError) {
    return <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>;
  }

  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const canAddUpdate = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);

  const cities: ICity[] = data?.data;

  if (cities?.length === 0) return <StartAddElementRightNow title="Cities" endpoint={CITIES_FRONTEND_ENDPOINT} />;

  return (
    <CustomTable cellHeads={tableHeader} isPending={false} endpoint={CITIES_FRONTEND_ENDPOINT} addAction={isAdmin}>
      {cities?.map((city) => (
        <CustomTableContentRow key={city.id} endpoint={CITIES_FRONTEND_ENDPOINT} id={city.id} updateAction={canAddUpdate} deleteAction={isAdmin}>
          <CustomTableCell sx={{ fontWeight: 700 }}>{city.name}</CustomTableCell>
          <CustomTableCell>{dayjs(city.created_at).format("MMM D, YYYY")}</CustomTableCell>
          <CustomTableCell>{dayjs(city.updated_at).format("MMM D, YYYY")}</CustomTableCell>
        </CustomTableContentRow>
      ))}
    </CustomTable>
  );
};

export default CitiesTable;
