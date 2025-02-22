import { GoBackButton, TextButton } from "@/elements/CustomButtons";
import { HeadingText } from "@/elements/HeadingText";
import { Stack } from "@mui/material";
import "server-only";
import AuthRegisterFormServer from "../../authForms/AuthRegisterFormServer";

const RegisterPage = () => {
  return (
    <>
      <GoBackButton sx={{ position: "absolute", top: "24px", left: "24px", zIndex: 50 }}>Back</GoBackButton>
      <AuthRegisterFormServer title="Register">
        <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
          <HeadingText>Already have an Account?</HeadingText>
          <TextButton href="/login">Sign In</TextButton>
        </Stack>
      </AuthRegisterFormServer>
    </>
  );
};
export default RegisterPage;
