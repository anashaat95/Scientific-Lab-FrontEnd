import CircleIcon from "@mui/icons-material/Circle";
import { Box, Card, Typography } from "@mui/material";
import { GoToPage } from "./GoToPage";

interface IPageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: IPageTitleProps) => {
  return null;
  <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%" }}>
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h4" fontWeight={600} color="primary">
        {title}
      </Typography>

      <Box display="flex" gap={2} alignItems="center">
        <GoToPage />
        <CircleIcon sx={{ fontSize: "6px" }} />
        <Typography variant="h6" fontWeight={400}>
          {title}
        </Typography>
      </Box>
    </Box>
  </Card>;
};
