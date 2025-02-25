import "server-only";

// components
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { IUserIdTokenNewEmailInput } from "../../authInterfaces";
import AuthPageLayoutServer from "../../AuthPageLayoutServer";
import { confirmEmailService } from "../../authServicesServer";
import ConfirmUpdatedEmailMessage from "./ConfirmUpdatedEmailMessage";

const ConfirmUpdatedEmail = async ({ searchParams }: { searchParams: IUserIdTokenNewEmailInput }) => {
  const { user_id, token, new_email } = searchParams;
  if (!user_id || !token || !new_email) redirect("/login");
  const data: IFetcherData = await fetcherFn(() => confirmEmailService({ user_id, token }));

  console.log(data);

  return (
    <AuthPageLayoutServer title="Confirm New Email" description="this is page for new email confirmation">
      <ConfirmUpdatedEmailMessage {...data} />
    </AuthPageLayoutServer>
  );
};

export default ConfirmUpdatedEmail;
