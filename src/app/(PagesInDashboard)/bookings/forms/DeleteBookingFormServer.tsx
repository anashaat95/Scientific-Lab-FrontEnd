import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";

import { isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import { IBooking } from "../bookingsInterfaces";
import { getBookingByIdService } from "../bookingsServicesBackEnd";
import DeleteBookingForm from "./DeleteBookingForm";

const DeleteBookingFormServer = async ({ id }: { id: string }) => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(BOOKINGS_FRONTEND_ENDPOINT);

  const bookingData: IFetcherData = await fetcherFn(() => getBookingByIdService(id));
  const booking: IBooking = bookingData.data?.data;

  if (!booking) redirect(BOOKINGS_FRONTEND_ENDPOINT);

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <DeleteBookingForm id={id} />
    </Suspense>
  );
};

export default DeleteBookingFormServer;
