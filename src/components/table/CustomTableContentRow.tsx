import { Theme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, SxProps, TableCell, TableRow } from "@mui/material";
import React from "react";
import { GoToPage } from "../GoToPage";

interface ICustomTableContentRow {
  endpoint: string;
  id: string;
  children: React.ReactNode;
  updateAction?: Boolean;
  deleteAction?: Boolean;
  sx?: SxProps<Theme>;
}

const CustomTableContentRow: React.FC<ICustomTableContentRow> = ({ endpoint, id, children, updateAction = true, deleteAction = true, sx }) => {
  return (
    <TableRow
      className="table-row"
      sx={{ paddingBottom: "2px", borderBottom: "1px solid #0074BA", "&:last-child td, &:last-child th": { border: 0 }, ...sx }}
    >
      {children}
      {(updateAction || deleteAction) && (
        <TableCell>
          <Box display="flex" alignItems="center" gap={1}>
            {updateAction && (
              <GoToPage href={`${endpoint}/update/${id}`}>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
              </GoToPage>
            )}
            {deleteAction && (
              <GoToPage href={`${endpoint}/delete/${id}`}>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </GoToPage>
            )}
          </Box>
        </TableCell>
      )}
    </TableRow>
  );
};

export default CustomTableContentRow;
