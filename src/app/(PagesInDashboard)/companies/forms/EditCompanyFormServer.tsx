import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData, IItemInSelect } from "@/interfaces";
import { fetcherFn, getCitiesCountriesSelectOptionsData } from "@/services/sharedServices";
import { Suspense } from "react";

import { getIdFromDtoEntityUrl } from "@/app/helpers";
import { isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { COMPANIES_FRONTEND_ENDPOINT } from "../companiesConsts";
import { ICompany, IEditCompanyFormInput } from "../companiesInterfaces";
import { getCompanyByIdService } from "../companiesServicesBackEnd";
import EditCompanyForm from "./EditCompanyForm";

const EditCompanyFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(COMPANIES_FRONTEND_ENDPOINT);

  const companyData: IFetcherData = await fetcherFn(() => getCompanyByIdService(id));
  const company: ICompany = companyData.data?.data;
  if (!company) redirect(COMPANIES_FRONTEND_ENDPOINT);

  const data: { cities: IItemInSelect[]; countries: IItemInSelect[] } = await getCitiesCountriesSelectOptionsData();
  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <EditCompanyForm {...data} company={ConvertCompanyToEditCompanyForm(company)} />
    </Suspense>
  );
};

const ConvertCompanyToEditCompanyForm = (company: ICompany): IEditCompanyFormInput => {
  return {
    id: company.id,
    name: company.name,
    street: company.street,
    zipCode: company.zipCode,
    website: company.website,
    city_id: getIdFromDtoEntityUrl(company.city_url),
    country_id: getIdFromDtoEntityUrl(company.country_url),
  };
};

export default EditCompanyFormServer;
