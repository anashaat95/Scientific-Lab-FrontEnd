import "server-only";

import { convertEnumToItemSelectArray } from "@/app/helpers";
import CustomLoader from "@/components/CustomLoader";
import { IItemInSelect } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import { getCompaniesSelectOptionsData } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { EQUIPMENTS_FRONTEND_ENDPOINT } from "../equipmentsConsts";
import { eEquipmentStatus, eEquipmentType } from "../equipmentsInterfaces";
import AddEquipmentForm from "./AddEquipmentForm";

const statuses: IItemInSelect[] = convertEnumToItemSelectArray(eEquipmentStatus);
const types: IItemInSelect[] = convertEnumToItemSelectArray(eEquipmentType);
const yesOrNo: IItemInSelect[] = [
  { value: false, label: "No" },
  { value: true, label: "Yes" },
];

const AddEquipmentFormServer = async () => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(EQUIPMENTS_FRONTEND_ENDPOINT);
  const data: { companies: IItemInSelect[] } = await getCompaniesSelectOptionsData();

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <AddEquipmentForm {...data} statuses={[statuses[eEquipmentStatus.Available]]} types={types} yesOrNo={yesOrNo} />
    </Suspense>
  );
};

export default AddEquipmentFormServer;
