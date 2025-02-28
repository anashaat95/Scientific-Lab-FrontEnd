import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Typography } from "@mui/material";
import { GoToPage } from "./GoToPage";

const StartAddElementRightNow = ({ title, endpoint }: { title: string; endpoint: string }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="60vw" height="60vh">
      <Typography variant="h2">No {title} Yet</Typography>
      <Typography variant="subtitle1" mt={1} mb={2}>
        Start Adding Right Now!
      </Typography>
      <GoToPage href={`${endpoint}/add`}>
        <IconButton color="primary">
          <AddIcon sx={{ fontSize: "48px" }} />
        </IconButton>
      </GoToPage>
    </Box>
  );
};

export default StartAddElementRightNow;
