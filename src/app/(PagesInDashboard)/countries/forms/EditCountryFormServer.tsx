import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";

import { isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { COUNTRIES_FRONTEND_ENDPOINT } from "../countriesConsts";
import { ICountry, IEditCountryFormInput } from "../countriesInterfaces";
import { getCountryByIdService } from "../countriesServicesBackEnd";
import EditCountryForm from "./EditCountryForm";

const EditCountryFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(COUNTRIES_FRONTEND_ENDPOINT);

  const countryData: IFetcherData = await fetcherFn(() => getCountryByIdService(id));
  const country: ICountry = countryData.data?.data;

  if (!country) redirect(COUNTRIES_FRONTEND_ENDPOINT);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <EditCountryForm country={ConvertCountryToEditCountryForm(country)} />
    </Suspense>
  );
};

const ConvertCountryToEditCountryForm = (country: ICountry): IEditCountryFormInput => {
  return {
    id: country.id,
    name: country.name,
  };
};

export default EditCountryFormServer;
