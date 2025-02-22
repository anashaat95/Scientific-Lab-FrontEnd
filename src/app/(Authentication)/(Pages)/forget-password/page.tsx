import { Stack } from "@mui/material";
import "server-only";

// components
import { GoBackButton } from "@/elements/CustomButtons";
import AuthForgetPasswordForm from "../../authForms/AuthForgetPasswordForm";
import AuthPageLayoutServer from "../../AuthPageLayoutServer";

const ForgetPasswordPage = () => {
  return (
    <>
      <GoBackButton sx={{ position: "absolute", top: "24px", left: "24px", zIndex: 50 }}>Back</GoBackButton>
      <AuthPageLayoutServer title="Forget Password" description="This is page for forget password">
        <Stack display="flex" direction="column" justifyContent="center" alignItems="center" gap={4}>
          <AuthForgetPasswordForm title="Forget Password" />
        </Stack>
      </AuthPageLayoutServer>
    </>
  );
};
export default ForgetPasswordPage;
