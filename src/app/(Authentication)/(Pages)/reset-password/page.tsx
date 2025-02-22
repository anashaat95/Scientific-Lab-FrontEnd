import "server-only";

// components
import { redirect } from "next/navigation";
import AuthPasswordResetFromTokenForm from "../../authForms/AuthPasswordResetFromTokenForm";
import { IUserIdAndTokenInput } from "../../authInterfaces";
import AuthPageLayoutServer from "../../AuthPageLayoutServer";

const ResetPasswordPage = ({ searchParams }: { searchParams: IUserIdAndTokenInput }) => {
  const { user_id, token } = searchParams;
  if (!user_id || !token) redirect("/login");
  return (
    <AuthPageLayoutServer title="Reset Password" description="this is page for password reset from token" gridSizes={{ sm: 8, md: 6, lg: 4, xl: 3 }}>
      <AuthPasswordResetFromTokenForm title="Create New Password" {...searchParams}>
        <></>
      </AuthPasswordResetFromTokenForm>
    </AuthPageLayoutServer>
  );
};
export default ResetPasswordPage;
