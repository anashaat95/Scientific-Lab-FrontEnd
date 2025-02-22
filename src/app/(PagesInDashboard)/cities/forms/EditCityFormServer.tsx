import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { CITIES_FRONTEND_ENDPOINT } from "../citiesConsts";
import { ICity, IEditCityFormInput } from "../citiesInterfaces";
import { getCityByIdService } from "../citiesServicesBackEnd";
import EditCityForm from "./EditCityForm";

const EditCityFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(CITIES_FRONTEND_ENDPOINT);

  const cityData: IFetcherData = await fetcherFn(() => getCityByIdService(id));
  const city: ICity = cityData.data?.data;
  if (!city) redirect(CITIES_FRONTEND_ENDPOINT);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <EditCityForm city={ConvertCityToEditCityForm(city)} />
    </Suspense>
  );
};

const ConvertCityToEditCityForm = (city: ICity): IEditCityFormInput => {
  return {
    id: city.id,
    name: city.name,
  };
};

export default EditCityFormServer;
