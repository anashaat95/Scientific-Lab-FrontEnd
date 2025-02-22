import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IItemInSelect } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import { getCitiesCountriesSelectOptionsData } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { COMPANIES_FRONTEND_ENDPOINT } from "../companiesConsts";
import AddCompanyForm from "./AddCompanyForm";

const AddCompanyFormServer = async () => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(COMPANIES_FRONTEND_ENDPOINT);

  const data: { cities: IItemInSelect[]; countries: IItemInSelect[] } = await getCitiesCountriesSelectOptionsData();

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <AddCompanyForm {...data} />
    </Suspense>
  );
};

export default AddCompanyFormServer;
