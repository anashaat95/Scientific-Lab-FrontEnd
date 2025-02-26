import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IEquipment } from "../../equipments/equipmentsInterfaces";
import { convertBookingStatus, eBookingStatus, IBooking } from "../bookingsInterfaces";

const ListBookingsOfEquipment = ({ selectedEquipment, date }: { selectedEquipment: IEquipment; date: dayjs.Dayjs }) => {
  const [filteredBookings, setFilteredBookings] = useState<IBooking[] | null>();

  useEffect(() => {
    if (!selectedEquipment?.bookings || selectedEquipment?.bookings.length === 0) setFilteredBookings(null);

    const bookings = selectedEquipment?.bookings?.filter((booking) => {
      if (convertBookingStatus(booking.status) === eBookingStatus.Cancelled || convertBookingStatus(booking.status) === eBookingStatus.Completed)
        return false;

      const bookingDate = dayjs(booking.start_date_time);

      if (
        bookingDate.get("year") !== date.get("year") ||
        bookingDate.get("month") !== date.get("month") ||
        bookingDate.get("day") !== date.get("day")
      )
        return false;

      return true;
    });
    setFilteredBookings(bookings?.sort((a: IBooking, b: IBooking) => new Date(b.start_date_time).getTime() - new Date(a.start_date_time).getTime()));
  }, [selectedEquipment?.bookings, date]);

  if (!filteredBookings || filteredBookings.length === 0) return null;

  return (
    <Grid item xs={12} sm={12} lg={12}>
      <Box p={1} sx={{ backgroundColor: "#b3d5ea", borderRadius: 2 }}>
        <List
          sx={{
            listStyleType: "disc",
            listStylePosition: "inside",
          }}
        >
          {filteredBookings.map((booking) => {
            if (convertBookingStatus(booking.status) === eBookingStatus.Confirmed || convertBookingStatus(booking.status) === eBookingStatus.Pending)
              return (
                <ListItem key={booking.id}>
                  <Typography variant="body1" fontWeight="400" sx={{ display: "list-item" }}>
                    From&nbsp;&nbsp;&nbsp;
                    <strong>{dayjs(booking.start_date_time).format("hh:mm A")}</strong>
                    &nbsp;&nbsp;&nbsp;To&nbsp;&nbsp;&nbsp;
                    <strong>{dayjs(booking.end_date_time).format("hh:mm A")}</strong>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({booking.status})
                  </Typography>
                </ListItem>
              );
          })}
        </List>
      </Box>
    </Grid>
  );
};

export default ListBookingsOfEquipment;
