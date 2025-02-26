import { Chip } from "@mui/material";
import { eBookingStatus } from "../bookingsInterfaces";

export const getStatusProps = (status: eBookingStatus) => {
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
