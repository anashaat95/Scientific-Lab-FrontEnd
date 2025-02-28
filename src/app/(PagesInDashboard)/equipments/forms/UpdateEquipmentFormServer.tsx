import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData, IItemInSelect } from "@/interfaces";
import { fetcherFn, getCompaniesSelectOptionsData } from "@/services/sharedServices";
import { Suspense } from "react";

import { convertEnumToItemSelectArray, getIdFromDtoEntityUrl } from "@/app/helpers";
import { isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { EQUIPMENTS_FRONTEND_ENDPOINT } from "../equipmentsConsts";
import { eEquipmentStatus, eEquipmentType, IEquipment, IUpdateEquipmentFormInput } from "../equipmentsInterfaces";
import { getEquipmentByIdService } from "../equipmentsServicesBackEnd";
import UpdateEquipmentForm from "./UpdateEquipmentForm";

const yesOrNo: IItemInSelect[] = [
  { value: false, label: "No" },
  { value: true, label: "Yes" },
];

const statuses: IItemInSelect[] = convertEnumToItemSelectArray(eEquipmentStatus);
const types: IItemInSelect[] = convertEnumToItemSelectArray(eEquipmentType);

const UpdateEquipmentFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(EQUIPMENTS_FRONTEND_ENDPOINT);

  const equipmentData: IFetcherData = await fetcherFn(() => getEquipmentByIdService(id));
  const equipment: IEquipment = equipmentData.data?.data;

  if (!equipment) redirect(EQUIPMENTS_FRONTEND_ENDPOINT);

  const data: { companies: IItemInSelect[] } = await getCompaniesSelectOptionsData();
  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <UpdateEquipmentForm
        {...data}
        statuses={statuses}
        types={types}
        yesOrNo={yesOrNo}
        equipment={ConvertEquipmentToUpdateEquipmentForm(equipment)}
      />
    </Suspense>
  );
};

const ConvertEquipmentToUpdateEquipmentForm = (equipment: IEquipment): IUpdateEquipmentFormInput => {
  return {
    id: equipment.id,
    name: equipment.name,
    total_quantity: equipment.total_quantity,
    type: eEquipmentType[equipment.type as keyof typeof eEquipmentType],
    status: eEquipmentStatus[equipment.status as keyof typeof eEquipmentStatus],
    purchase_date: equipment.purchase_date,
    serial_number: equipment.serial_number,
    specifications: equipment.specifications,
    description: equipment.description,
    CanBeLeftOverNight: equipment.can_be_left_overnight === "True",
    image: equipment.image_url || "",
    company_id: getIdFromDtoEntityUrl(equipment.company_url),
  };
};

export default UpdateEquipmentFormServer;
