import "server-only";

import { convertEnumToItemSelectArray } from "@/app/helpers";
import CustomLoader from "@/components/CustomLoader";
import { IFetcherData, IItemInSelect } from "@/interfaces";
import { isAuthorized } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { eEquipmentStatus, IEquipment } from "../../equipments/equipmentsInterfaces";
import { getAllEquipmentsWithBookingsService } from "../../equipments/equipmentsServicesBackEnd";
import { ILab } from "../../labs/labsInterfaces";
import { getLabByNameService } from "../../labs/labsServicesBackEnd";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import { eBookingStatus } from "../bookingsInterfaces";
import AddBookingForm from "./AddBookingForm";

const statuses: IItemInSelect[] = convertEnumToItemSelectArray(eBookingStatus);
const yesOrNo: IItemInSelect[] = [
  { value: "false", label: "No" },
  { value: "true", label: "Yes" },
];

const AddBookingFormServer = async () => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString(), enUserRoles.Researcher.toString()]);
  if (!isAllowed) redirect(BOOKINGS_FRONTEND_ENDPOINT);

  const options: { researchers: IItemInSelect[]; equipments: IItemInSelect[] } = { researchers: [], equipments: [] };
  const { data: equipmentsFullData }: IFetcherData = await fetcherFn(getAllEquipmentsWithBookingsService);

  equipmentsFullData.data.forEach((equipment: IEquipment) => {
    if (equipment.status === eEquipmentStatus[eEquipmentStatus.Available]) {
      options.equipments.push({ value: equipment.id, label: equipment.name });
    }
  });

  const labData: IFetcherData = await fetcherFn(() => getLabByNameService("Pharmaceutics Lab"));
  const pharmaceuticsLab: ILab = labData?.data?.data;

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <AddBookingForm
        lab={pharmaceuticsLab}
        equipmentsFullData={equipmentsFullData.data}
        statuses={[statuses[0], statuses[1]]}
        yesOrNo={yesOrNo}
        {...options}
      />
    </Suspense>
  );
};

export default AddBookingFormServer;
