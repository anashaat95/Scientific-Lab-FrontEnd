import { Theme } from "@emotion/react";
import { SxProps, TableCell } from "@mui/material";
const CustomTableCell = ({ sx, children }: { sx?: SxProps<Theme>; children: React.ReactNode }) => {
  return (
    <TableCell className="table-cell" sx={{ lineHeight: 1.2, fontWeight: "400", fontSize: "16px", ...sx }} component="th" scope="row">
      {children || ""}
    </TableCell>
  );
};
export default CustomTableCell;
