import "server-only";

// components
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { IUserIdAndTokenInput } from "../../authInterfaces";
import AuthPageLayoutServer from "../../AuthPageLayoutServer";
import { confirmEmailService } from "../../authServicesServer";
import ConfirmEmailMessage from "./ConfirmEmailMessage";

const ConfirmEmail = async ({ searchParams }: { searchParams: IUserIdAndTokenInput }) => {
  const { user_id, token } = searchParams;
  if (!user_id || !token) redirect("/login");
  const data: IFetcherData = await fetcherFn(() => confirmEmailService({ user_id, token }));

  return (
    <AuthPageLayoutServer title="Confirm Email" description="this is page for email confirmation">
      <ConfirmEmailMessage {...data} />
    </AuthPageLayoutServer>
  );
};

export default ConfirmEmail;
