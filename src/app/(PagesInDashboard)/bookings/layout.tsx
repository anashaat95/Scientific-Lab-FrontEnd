import PageContainer from "@/components/container/PageContainer";
import CustomLoader from "@/components/CustomLoader";
import { PageTitle } from "@/components/PageTitle";
import { Box } from "@mui/material";
import React, { Suspense } from "react";
import BookingsFetcher from "./components/BookingsFetcherServer";
const BookingsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <PageContainer title="Bookings" description="this is bookings page">
        <Box display="flex" flexDirection="column" gap={2} alignItems="center" width="100%">
          <PageTitle title="Bookings" />
          <BookingsFetcher />
          {children}
        </Box>
      </PageContainer>
    </Suspense>
  );
};

export default BookingsLayout;
