"use client";
import { TableHead, TableRow } from "@mui/material";
import CustomTableCell from "./CustomTableCell";

function CustomTableHead({ cellHeads }: { cellHeads: Array<string> }) {
  return (
    <TableHead className="table-head">
      <TableRow className="table-row">
        {cellHeads.map((head) => (
          <CustomTableCell key={head} sx={{ fontWeight: 700, fontSize: "18px", color: "#0074BA", borderBottom: "2px solid #0074BA" }}>
            {head}
          </CustomTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHead;
