import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";

import { isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { LABS_FRONTEND_ENDPOINT } from "../labsConsts";
import { ILab } from "../labsInterfaces";
import { getLabByIdService } from "../labsServicesBackEnd";
import DeleteLabForm from "./DeleteLabForm";

const DeleteLabFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString()]);
  if (!isAllowed) redirect(LABS_FRONTEND_ENDPOINT);

  const labData: IFetcherData = await fetcherFn(() => getLabByIdService(id));
  const lab: ILab = labData.data?.data;

  if (!lab) redirect(LABS_FRONTEND_ENDPOINT);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <DeleteLabForm id={id} />
    </Suspense>
  );
};

export default DeleteLabFormServer;
