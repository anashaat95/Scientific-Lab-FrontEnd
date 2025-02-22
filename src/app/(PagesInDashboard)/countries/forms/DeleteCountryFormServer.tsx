import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";

import { isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { COUNTRIES_FRONTEND_ENDPOINT } from "../countriesConsts";
import { ICountry } from "../countriesInterfaces";
import { getCountryByIdService } from "../countriesServicesBackEnd";
import DeleteCountryForm from "./DeleteCountryForm";

const DeleteCountryFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString()]);
  if (!isAllowed) redirect(COUNTRIES_FRONTEND_ENDPOINT);

  const countryData: IFetcherData = await fetcherFn(() => getCountryByIdService(id));
  const country: ICountry = countryData.data?.data;

  if (!country) redirect(COUNTRIES_FRONTEND_ENDPOINT);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <DeleteCountryForm id={id} />
    </Suspense>
  );
};

export default DeleteCountryFormServer;
