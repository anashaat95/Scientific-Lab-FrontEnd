import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Paper, Table, TableBody, TableContainer } from "@mui/material";
import { GoToPage } from "../GoToPage";
import CustomTableHead from "./CustomTableHead";
import CustomTableLoadingCell from "./CustomTableLoadingCell";

interface ICustomTableProps {
  cellHeads: Array<string>;
  children: React.ReactNode;
  isPending: Boolean;
  endpoint: string;
  addAction?: Boolean;
}

function CustomTable({ cellHeads, isPending, children, endpoint, addAction = true }: ICustomTableProps) {
  return (
    <>
      <TableContainer className="table-container" component={Paper} sx={{ padding: "24px", borderRadius: 2 }}>
        <Table className="table">
          <CustomTableHead cellHeads={cellHeads} />
          <TableBody className="table-body">{isPending ? <CustomTableLoadingCell /> : children}</TableBody>
        </Table>
      </TableContainer>
      {addAction && (
        <Box display="flex" width="100%" justifyContent="right">
          <GoToPage href={`${endpoint}/add`}>
            <IconButton color="primary">
              <AddIcon sx={{ fontSize: "48px" }} />
            </IconButton>
          </GoToPage>
        </Box>
      )}
    </>
  );
}

export default CustomTable;
