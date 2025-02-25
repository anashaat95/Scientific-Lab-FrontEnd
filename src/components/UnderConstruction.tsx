import { HeadingText } from "@/elements/HeadingText";
import CodeIcon from "@mui/icons-material/Code";
import { Box } from "@mui/material";

export const UnderConstruction = () => {
  return (
    <Box display="flex" flexDirection="column" gap={4} justifyContent="center" alignItems="center" height="50vh" width="50vw">
      <CodeIcon color="primary" sx={{ fontSize: "96px" }} />
      <HeadingText varient="h2">Under Construction</HeadingText>
    </Box>
  );
};
