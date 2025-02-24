import "server-only";

import { getIdFromDtoEntityUrl } from "@/app/helpers";
import CustomLoader from "@/components/CustomLoader";
import { IFetcherData, IItemInSelect } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn, getCompaniesDepartmentsLabsSelectOptionsData } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { USERS_FRONTEND_ENDPOINT } from "../usersConsts";
import { IUpdateUserFormInput, IUser } from "../usersInterfaces";
import { getUserByIdService } from "../usersServicesBackEnd";
import UpdateUserForm from "./UpdateUserForm";

const UpdateUserFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString()]);
  if (!isAllowed) redirect(USERS_FRONTEND_ENDPOINT);

  const userData: IFetcherData = await fetcherFn(() => getUserByIdService(id));
  const user: IUser = userData.data?.data;
  if (!user) redirect(USERS_FRONTEND_ENDPOINT);

  const data: { companies: IItemInSelect[]; departments: IItemInSelect[]; labs: IItemInSelect[] } =
    await getCompaniesDepartmentsLabsSelectOptionsData();
  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <UpdateUserForm {...data} user={ConvertUserToUpdateUserForm(user)} />
    </Suspense>
  );
};

const ConvertUserToUpdateUserForm = (user: IUser): IUpdateUserFormInput => {
  return {
    id: user.id,
    userName: user.userName,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
    image_url: user.image_url,
    company_id: getIdFromDtoEntityUrl(user.company_url),
    department_id: getIdFromDtoEntityUrl(user.department_url),
    lab_id: getIdFromDtoEntityUrl(user.lab_url),
    google_scholar_url: user.google_scholar_url,
    academia_url: user.academia_url,
    scopus_url: user.scopus_url,
    researcher_gate_url: user.researcher_gate_url,
    expertise_area: user.expertise_area,
  };
};

export default UpdateUserFormServer;
