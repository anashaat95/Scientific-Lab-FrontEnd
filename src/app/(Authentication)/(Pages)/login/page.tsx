import { Stack } from "@mui/material";
// components
import AuthLoginForm from "@/app/(Authentication)/authForms/AuthLoginForm";
import { GoToButton, TextButton } from "@/elements/CustomButtons";
import { HeadingText } from "@/elements/HeadingText";
import AuthPageLayoutServer from "../../AuthPageLayoutServer";

const LoginPage = () => {
  return (
    <AuthPageLayoutServer title="Login" description="This is the login page">
      <GoToButton href="/" sx={{ position: "absolute", top: "24px", left: "24px", zIndex: 50 }}>
        Home
      </GoToButton>
      <AuthLoginForm>
        <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
          <HeadingText>New to Spike?</HeadingText>
          <TextButton href="/register">Create an account</TextButton>
        </Stack>
      </AuthLoginForm>
    </AuthPageLayoutServer>
  );
};
export default LoginPage;
