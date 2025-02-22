import { IEmailInput } from "@/app/(Authentication)/authInterfaces";
import AuthPageLayoutServer from "@/app/(Authentication)/AuthPageLayoutServer";
import { userExistsByEmailService } from "@/app/(PagesInDashboard)/users/usersServicesBackEnd";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import "server-only";
import EmailSentSuccessfully from "./EmailSentSuccessfullyMessage";

// components

const ConfirmEmail = async ({ searchParams }: { searchParams: IEmailInput }) => {
  const { email } = searchParams;
  if (!email) redirect("/login");

  const data: IFetcherData = await fetcherFn(() => userExistsByEmailService(email));
  const exists: Boolean | undefined = data?.data?.data;

  if (!exists) redirect("/login");

  return (
    <AuthPageLayoutServer title="Confirm Email" description="this is page for tell user to go to email to confirm it">
      <EmailSentSuccessfully {...data} email={email} />
    </AuthPageLayoutServer>
  );
};

export default ConfirmEmail;
