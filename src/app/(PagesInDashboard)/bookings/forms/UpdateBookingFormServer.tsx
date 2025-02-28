import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData, IItemInSelect } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";

import { convertEnumToItemSelectArray, getIdFromDtoEntityUrl } from "@/app/helpers";
import { GetJwtTokenPayload, isAuthorized } from "@/services/jwtTokenService";
import dayjs from "dayjs";
import { redirect } from "next/navigation";
import { getEquipmentWithBookingsByIdService } from "../../equipments/equipmentsServicesBackEnd";
import { ILab } from "../../labs/labsInterfaces";
import { getLabByNameService } from "../../labs/labsServicesBackEnd";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import { convertBookingStatus, eBookingStatus, IBooking, IUpdateBookingFormInputFromServer } from "../bookingsInterfaces";
import { getBookingByIdService } from "../bookingsServicesBackEnd";
import UpdateBookingForm from "./UpdateBookingForm";

const statuses: IItemInSelect[] = convertEnumToItemSelectArray(eBookingStatus);
const yesOrNo: IItemInSelect[] = [
  { value: false, label: "No" },
  { value: true, label: "Yes" },
];

const UpdateBookingFormServer = async ({ id }: { id: string }) => {
  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString(), enUserRoles.Researcher.toString()]);
  if (!isAllowed) redirect(BOOKINGS_FRONTEND_ENDPOINT);

  const bookingData: IFetcherData = await fetcherFn(() => getBookingByIdService(id));
  const booking: IBooking = bookingData.data?.data;

  if (!booking) redirect(BOOKINGS_FRONTEND_ENDPOINT);
  if (!isAdmin && convertBookingStatus(booking.status) === eBookingStatus.Cancelled) return;

  const token = await GetJwtTokenPayload();
  const isCreatedByUser = token?.sub === getIdFromDtoEntityUrl(booking.user_url);
  if (!isCreatedByUser && !isAllowed) redirect(BOOKINGS_FRONTEND_ENDPOINT);

  const options: { researchers: IItemInSelect[]; equipments: IItemInSelect[] } = { researchers: [], equipments: [] };
  const { data: bookedEquipment }: IFetcherData = await fetcherFn(() =>
    getEquipmentWithBookingsByIdService(getIdFromDtoEntityUrl(booking.equipment_url))
  );

  options.equipments.push({ value: bookedEquipment.data.id, label: bookedEquipment.data.name });

  const labData: IFetcherData = await fetcherFn(() => getLabByNameService("Pharmaceutics Lab"));
  const pharmaceuticsLab: ILab = labData?.data?.data;

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <UpdateBookingForm
        bookedEquipment={bookedEquipment.data}
        {...options}
        statuses={statuses}
        yesOrNo={yesOrNo}
        booking={ConvertBookingToUpdateBookingForm(booking)}
        lab={pharmaceuticsLab}
      />
    </Suspense>
  );
};

const ConvertBookingToUpdateBookingForm = (booking: IBooking): IUpdateBookingFormInputFromServer => {
  return {
    id: booking.id,
    start_time: dayjs(booking.start_date_time).format("HH:mm A"),
    end_time: dayjs(booking.end_date_time).format("HH:mm A"),
    start_date: dayjs(booking.start_date_time).format("DD MMMM YYYY"),
    end_date: dayjs(booking.end_date_time).format("DD MMMM YYYY"),
    is_on_overnight: booking.is_on_overnight === "True" ? "true" : "false",
    notes: booking.notes,
    status: eBookingStatus[booking.status as keyof typeof eBookingStatus],
    user_id: getIdFromDtoEntityUrl(booking.user_url),
    equipment_id: getIdFromDtoEntityUrl(booking.equipment_url),
  };
};

export default UpdateBookingFormServer;
