import { TableCell, TableRow } from "@mui/material";
import CustomLoader from "../CustomLoader";

function CustomTableLoadingCell() {
  return (
    <TableRow className="table-row">
      <TableCell className="table-loader-cell" colSpan={6} align="center">
        <CustomLoader />
      </TableCell>
    </TableRow>
  );
}

export default CustomTableLoadingCell;
