import { getIdFromDtoEntityUrl } from "@/app/helpers";
import CustomMessage from "@/components/CustomMessage";
import CustomTable from "@/components/table/CustomTable";
import CustomTableCell from "@/components/table/CustomTableCell";
import CustomTableContentRow from "@/components/table/CustomTableContentRow";
import { GoToButton } from "@/elements/CustomButtons";
import { IFetcherData } from "@/interfaces";
import { GetJwtTokenPayload, isAuthorized } from "@/services/jwtTokenService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Chip, TableCell, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import { convertBookingStatus, eBookingStatus, IBooking } from "../bookingsInterfaces";

const tableHeader: Array<string> = ["Booking", "Start", "End", "Overnight", "Notes", "Status", "Researcher", ""];

const BookingsTable = async ({ data, errorMessage, isNetworkError }: IFetcherData) => {
  if (isNetworkError) {
    return <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>;
  }

  const token = await GetJwtTokenPayload();
  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const canAddUpdate = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString(), enUserRoles.Researcher.toString()]);

  const bookings: IBooking[] = data?.data;

  let prevDate = new Date(bookings[0].start_date_time).toISOString().slice(0, 7);
  let nextDate = "";

  let dateComponent = <DateCell key={prevDate} dateStr={prevDate} />;

  return (
    <CustomTable cellHeads={tableHeader} isPending={false} endpoint={BOOKINGS_FRONTEND_ENDPOINT} addAction={canAddUpdate}>
      {dateComponent}
      {bookings?.map((booking) => {
        nextDate = new Date(booking.start_date_time).toISOString().slice(0, 7);
        if (nextDate != prevDate) {
          dateComponent = <DateCell key={nextDate} dateStr={nextDate} />;
        } else {
          dateComponent = <></>;
        }

        prevDate = nextDate;
        nextDate = "";

        return (
          <>
            {dateComponent}
            <CustomTableContentRow
              key={booking.id}
              endpoint={BOOKINGS_FRONTEND_ENDPOINT}
              id={booking.id}
              deleteAction={isAdmin}
              updateAction={isAdmin || (canAddUpdate && token?.nameid === getIdFromDtoEntityUrl(booking.user_url))}
            >
              <CustomTableCell sx={{ fontWeight: 700, lineHeight: "1.5" }}>{booking.equipment_name}</CustomTableCell>
              <CustomTableCell sx={{ width: "128px" }}>
                {dayjs(booking.start_date_time).format("MMM D")}
                <br />
                {dayjs(booking.start_date_time).format("h:mm A")}
              </CustomTableCell>
              <CustomTableCell sx={{ width: "128px" }}>
                {dayjs(booking.end_date_time).format("MMM D")}
                <br />
                {dayjs(booking.end_date_time).format("h:mm A")}
              </CustomTableCell>
              <CustomTableCell>{booking.is_on_overnight === "True" ? "Yes" : "No"}</CustomTableCell>
              <CustomTableCell>{booking.notes}</CustomTableCell>
              <CustomTableCell>
                <BookingStatusChip status={convertBookingStatus(booking.status)} />
              </CustomTableCell>
              <CustomTableCell>
                <GoToButton
                  variant="text"
                  href={`/account/${getIdFromDtoEntityUrl(booking.user_url)}`}
                  sx={{
                    color: "#000",
                    "&:hover": {
                      color: "#0074BA",
                      transition: "color ease-in 0.3s",
                    },
                  }}
                >
                  {booking.user_name}
                </GoToButton>
              </CustomTableCell>
            </CustomTableContentRow>
          </>
        );
      })}
    </CustomTable>
  );
};

export default BookingsTable;

const DateCell = ({ dateStr }: { dateStr: string }) => {
  return (
    <TableRow className="table-row">
      <TableCell colSpan={tableHeader.length}>
        <Box
          sx={{
            color: "#000",
            backgroundColor: "#80badd",
            height: "48px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CalendarMonthIcon sx={{ marginLeft: "10px" }} />
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: 600,
              marginLeft: "10px",
            }}
          >
            {dayjs(dateStr).format("MMM, YYYY")}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};

const getStatusProps = (status: eBookingStatus) => {
  switch (status) {
    case eBookingStatus.Completed:
      return { label: "Completed", color: "success" };
    case eBookingStatus.Pending:
      return { label: "Pending", color: "warning" };
    case eBookingStatus.Confirmed:
      return { label: "Confirmed", color: "success" };
    case eBookingStatus.Cancelled:
      return { label: "Cancelled", color: "error" };
    default:
      return { label: "Unknown", color: "default" };
  }
};

interface BookingStatusChipProps {
  status: eBookingStatus;
}

export const BookingStatusChip: React.FC<BookingStatusChipProps> = ({ status }) => {
  const { label, color } = getStatusProps(status);

  return <Chip label={label} color={color as any} variant={`${status === eBookingStatus.Confirmed ? "filled" : "outlined"}`} />;
};
