import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData, IItemInSelect } from "@/interfaces";
import { fetcherFn, getDepartmentsUsersSelectOptionsData } from "@/services/sharedServices";
import { Suspense } from "react";

import { convertToValidTimeStr, getIdFromDtoEntityUrl } from "@/app/helpers";
import { isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { LABS_FRONTEND_ENDPOINT } from "../labsConsts";
import { IEditLabFormInput, ILab } from "../labsInterfaces";
import { getLabByIdService } from "../labsServicesBackEnd";
import EditLabForm from "./EditLabForm";

const EditLabFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(LABS_FRONTEND_ENDPOINT);

  const labData: IFetcherData = await fetcherFn(() => getLabByIdService(id));
  const lab: ILab = labData.data?.data;

  if (!lab) redirect(LABS_FRONTEND_ENDPOINT);

  const data: { departments: IItemInSelect[]; users: IItemInSelect[] } = await getDepartmentsUsersSelectOptionsData();

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <EditLabForm {...data} lab={ConvertLabToEditLabForm(lab)} />
    </Suspense>
  );
};

const ConvertLabToEditLabForm = (lab: ILab): IEditLabFormInput => {
  return {
    id: lab.id,
    name: lab.name,
    capacity: lab.capacity,
    opening_time: convertToValidTimeStr(lab.opening_time),
    closing_time: convertToValidTimeStr(lab.closing_time),
    supervisor_id: getIdFromDtoEntityUrl(lab.supervisor_url),
    department_id: getIdFromDtoEntityUrl(lab.department_url),
  };
};

export default EditLabFormServer;
