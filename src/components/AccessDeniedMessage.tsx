import { HeadingText } from "@/elements/HeadingText";
import { Box } from "@mui/material";
import CustomMessage from "./CustomMessage";

const AccessDeniedMessage = ({ page = true }: { page?: Boolean }) => {
  const height = page ? "50vh" : "100%";
  const width = page ? "50vw" : "100%";
  return (
    <Box
      sx={{
        height,
        width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomMessage type="access_denied">
        <HeadingText varient="h4">You are not authorized!</HeadingText>
      </CustomMessage>
    </Box>
  );
};

export default AccessDeniedMessage;
