import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData, IItemInSelect } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";

import { convertEnumToItemSelectArray, getIdFromDtoEntityUrl } from "@/app/helpers";
import { GetJwtTokenPayload, isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { getEquipmentByIdService } from "../../equipments/equipmentsServicesBackEnd";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import { eBookingStatus, IBooking, IUpdateBookingFormInput } from "../bookingsInterfaces";
import { getBookingByIdService } from "../bookingsServicesBackEnd";
import UpdateBookingForm from "./UpdateBookingForm";

const statuses: IItemInSelect[] = convertEnumToItemSelectArray(eBookingStatus);
const yesOrNo: IItemInSelect[] = [
  { value: false, label: "No" },
  { value: true, label: "Yes" },
];

const UpdateBookingFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString(), enUserRoles.Researcher.toString()]);
  if (!isAllowed) redirect(BOOKINGS_FRONTEND_ENDPOINT);

  const bookingData: IFetcherData = await fetcherFn(() => getBookingByIdService(id));
  const booking: IBooking = bookingData.data?.data;

  if (!booking) redirect(BOOKINGS_FRONTEND_ENDPOINT);

  const token = await GetJwtTokenPayload();
  const isCreatedByUser = token?.nameid === getIdFromDtoEntityUrl(booking.user_url);
  if (!isCreatedByUser && !isAllowed) redirect(BOOKINGS_FRONTEND_ENDPOINT);

  const options: { researchers: IItemInSelect[]; equipments: IItemInSelect[] } = { researchers: [], equipments: [] };
  const { data: bookedEquipment }: IFetcherData = await fetcherFn(() => getEquipmentByIdService(getIdFromDtoEntityUrl(booking.equipment_url)));

  options.equipments.push({ value: bookedEquipment.data.id, label: bookedEquipment.data.name });
  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <UpdateBookingForm
        bookedEquipment={bookedEquipment.data}
        {...options}
        statuses={statuses}
        yesOrNo={yesOrNo}
        booking={ConvertBookingToUpdateBookingForm(booking)}
      />
    </Suspense>
  );
};

const ConvertBookingToUpdateBookingForm = (booking: IBooking): IUpdateBookingFormInput => {
  return {
    id: booking.id,
    start_date_time: new Date(booking.start_date_time).toISOString().slice(0, 16),
    end_date_time: new Date(booking.end_date_time).toISOString().slice(0, 16),
    is_on_overnight: booking.is_on_overnight === "True",
    notes: booking.notes,
    status: eBookingStatus[booking.status as keyof typeof eBookingStatus],
    user_id: getIdFromDtoEntityUrl(booking.user_url),
    equipment_id: getIdFromDtoEntityUrl(booking.equipment_url),
  };
};

export default UpdateBookingFormServer;
