import { formatDateTime, getIdFromDtoEntityUrl } from "@/app/helpers";
import CustomMessage from "@/components/CustomMessage";
import CustomTable from "@/components/table/CustomTable";
import CustomTableCell from "@/components/table/CustomTableCell";
import CustomTableContentRow from "@/components/table/CustomTableContentRow";
import { GoToButton } from "@/elements/CustomButtons";
import { IFetcherData } from "@/interfaces";
import { GetJwtTokenPayload, isAuthorized } from "@/services/jwtTokenService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import { convertBookingStatus, IBooking } from "../bookingsInterfaces";
import { BookingStatusChip } from "./BookingStatusChip";

dayjs.extend(utc);
const tableHeader: Array<string> = ["Booking", "Start", "End", "Overnight", "Notes", "Status", "Researcher", "Created", ""];

const BookingsTable = async ({ data, errorMessage, isNetworkError }: IFetcherData) => {
  if (isNetworkError) {
    return <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>;
  }

  const token = await GetJwtTokenPayload();
  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const canAddUpdate = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString(), enUserRoles.Researcher.toString()]);

  const bookings: IBooking[] = data?.data?.sort((a: IBooking, b: IBooking) => dayjs(b.start_date_time).isAfter(dayjs(a.start_date_time)));
  console.log(data?.data);

  let prevDate = dayjs(bookings?.[0].start_date_time);
  let nextDate = dayjs();

  let dateComponent = <DateCell key={prevDate.toISOString()} date={prevDate} />;

  return (
    <CustomTable cellHeads={tableHeader} isPending={false} endpoint={BOOKINGS_FRONTEND_ENDPOINT} addAction={canAddUpdate}>
      {dateComponent}
      {bookings?.map((booking) => {
        nextDate = dayjs(booking.start_date_time);
        if (nextDate.get("year") !== prevDate.get("year") || nextDate.get("month") !== prevDate.get("month")) {
          dateComponent = <DateCell key={nextDate.toISOString()} date={nextDate} />;
        } else {
          dateComponent = <></>;
        }

        prevDate = nextDate;
        nextDate = dayjs();

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

              <CustomTableCell>{formatDateTime(booking.created_at)}</CustomTableCell>
            </CustomTableContentRow>
          </>
        );
      })}
    </CustomTable>
  );
};
// 2025-02-25T00:01:47.6829093

export default BookingsTable;

const DateCell = ({ date }: { date: dayjs.Dayjs }) => {
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
            {date.format("MMM, YYYY")}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};
