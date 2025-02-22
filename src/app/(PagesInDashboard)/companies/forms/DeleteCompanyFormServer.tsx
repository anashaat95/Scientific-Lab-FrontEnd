import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";

import { isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { COMPANIES_FRONTEND_ENDPOINT } from "../companiesConsts";
import { ICompany } from "../companiesInterfaces";
import { getCompanyByIdService } from "../companiesServicesBackEnd";
import DeleteCompanyForm from "./DeleteCompanyForm";

const DeleteCompanyFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString()]);
  if (!isAllowed) redirect(COMPANIES_FRONTEND_ENDPOINT);

  const companyData: IFetcherData = await fetcherFn(() => getCompanyByIdService(id));
  const company: ICompany = companyData.data?.data;
  if (!company) redirect(COMPANIES_FRONTEND_ENDPOINT);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <DeleteCompanyForm id={id} />
    </Suspense>
  );
};

export default DeleteCompanyFormServer;
