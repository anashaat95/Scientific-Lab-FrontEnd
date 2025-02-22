import CustomLoader from "@/components/CustomLoader";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";
import "server-only";
import { getAllBookingsService } from "../bookingsServicesBackEnd";
import BookingsTable from "./BookingsTable";

const BookingsFetcher = async () => {
  const data = await fetcherFn(getAllBookingsService);

  return (
    <Suspense fallback={<CustomLoader />}>
      <BookingsTable {...data} />
    </Suspense>
  );
};

export default BookingsFetcher;
