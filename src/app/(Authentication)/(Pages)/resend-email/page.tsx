import "server-only";

import { Stack } from "@mui/material";

// components
import AuthResendEmailForm from "@/app/(Authentication)/authForms/AuthResendEmailForm";
import AuthPageLayoutServer from "../../AuthPageLayoutServer";

const ResendEmailPage = () => {
  return (
    <AuthPageLayoutServer title="Resend Email" description="This is page for sending email confirmation">
      <Stack display="flex" direction="column" justifyContent="center" alignItems="center" gap={4}>
        <AuthResendEmailForm />
      </Stack>
    </AuthPageLayoutServer>
  );
};
export default ResendEmailPage;
