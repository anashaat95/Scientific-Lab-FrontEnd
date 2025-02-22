import { getIdFromDtoEntityUrl } from "@/app/helpers";
import CustomMessage from "@/components/CustomMessage";
import CustomTable from "@/components/table/CustomTable";
import CustomTableCell from "@/components/table/CustomTableCell";
import CustomTableContentRow from "@/components/table/CustomTableContentRow";
import { IFetcherData } from "@/interfaces";
import { GetJwtTokenPayload, isAuthorized } from "@/services/jwtTokenService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import "server-only";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { BOOKINGS_FRONTEND_ENDPOINT } from "../bookingsConsts";
import { IBooking } from "../bookingsInterfaces";

const tableHeader: Array<string> = ["Equipment", "Start", "End", "Overnight", "Notes", "Status", "Researcher", ""];

const BookingsTable = async ({ data, errorMessage, isNetworkError }: IFetcherData) => {
  if (isNetworkError) {
    return <CustomMessage type={isNetworkError ? "network" : "error"}>{errorMessage}</CustomMessage>;
  }

  const token = await GetJwtTokenPayload();
  const isAdmin = await isAuthorized([enUserRoles.Admin.toString()]);
  const canAddEdit = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString(), enUserRoles.Researcher.toString()]);

  const bookings: IBooking[] = data?.data;

  let prevDate = new Date(bookings[0].start_date_time).toISOString().slice(0, 7);
  let nextDate = "";

  let dateComponent = <DateCell key={prevDate} dateStr={prevDate} />;

  return (
    <CustomTable cellHeads={tableHeader} isPending={false} endpoint={BOOKINGS_FRONTEND_ENDPOINT} addAction={canAddEdit}>
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
              editAction={isAdmin || (canAddEdit && token?.nameid === getIdFromDtoEntityUrl(booking.user_url))}
            >
              <CustomTableCell sx={{ fontWeight: 700 }}>{booking.equipment_name}</CustomTableCell>
              <CustomTableCell>{dayjs(booking.start_date_time).format("h:mm A")}</CustomTableCell>
              <CustomTableCell>{dayjs(booking.end_date_time).format("h:mm A")}</CustomTableCell>
              <CustomTableCell>{booking.is_on_overnight === "True" ? "Yes" : "No"}</CustomTableCell>
              <CustomTableCell>{booking.notes}</CustomTableCell>
              <CustomTableCell>{booking.status}</CustomTableCell>
              <CustomTableCell>{booking.user_name}</CustomTableCell>
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
