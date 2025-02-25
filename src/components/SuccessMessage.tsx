import { NormalButton } from "@/elements/CustomButtons";
import { HeadingText } from "@/elements/HeadingText";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomMessage from "./CustomMessage";

const SuccessMessage = ({ page = true, backUrl }: { page?: Boolean; backUrl?: string }) => {
  const router = useRouter();
  const height = page ? "50vh" : "100%";
  const width = page ? "50vw" : "100%";
  return (
    <Box
      sx={{
        // height,
        // width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomMessage type="success">
        <HeadingText varient="h4">Success</HeadingText>
        <NormalButton
          onClick={() => {
            router.refresh();
            if (backUrl) router.push(backUrl);
            else router.back();
          }}
        >
          Close
        </NormalButton>
      </CustomMessage>
    </Box>
  );
};

export default SuccessMessage;
