import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";

import { isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { EQUIPMENTS_FRONTEND_ENDPOINT } from "../equipmentsConsts";
import { IEquipment } from "../equipmentsInterfaces";
import { getEquipmentByIdService } from "../equipmentsServicesBackEnd";
import DeleteEquipmentForm from "./DeleteEquipmentForm";

const DeleteEquipmentFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString()]);
  if (!isAllowed) redirect(EQUIPMENTS_FRONTEND_ENDPOINT);

  const equipmentData: IFetcherData = await fetcherFn(() => getEquipmentByIdService(id));
  const equipment: IEquipment = equipmentData.data?.data;
  if (!equipment) redirect(EQUIPMENTS_FRONTEND_ENDPOINT);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <DeleteEquipmentForm id={id} />
    </Suspense>
  );
};

export default DeleteEquipmentFormServer;
