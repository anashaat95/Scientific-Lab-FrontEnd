import "server-only";

import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import CustomLoader from "@/components/CustomLoader";
import { GoBackButton } from "@/elements/CustomButtons";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Grid } from "@mui/material";
import { Suspense } from "react";
import { getUserByIdService } from "../../users/usersServicesBackEnd";
import { ProfilePageProps } from "../[id]/page";
import UpdateEmailFormClient from "./UpdateEmailFormClient";
import UpdatePasswordFormClient from "./UpdatePasswordFormClient";
import PersonalDataUpdateFormClient from "./UpdatePersonalDataFormClient";
import UpdateUsernameFormClient from "./UpdateUsernameFormClient";

const ProfileUpdateFormServer = async ({ params }: ProfilePageProps) => {
  const { id } = params;
  const data: IFetcherData = await fetcherFn(() => getUserByIdService(id));
  const currentUser: IUser = data?.data?.data;

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <GoBackButton sx={{ mb: 3 }} />
      <Grid container xs={12} sm={12} md={12} lg={12} xl={12} gap={2}>
        <Grid item xs={12} sm={12} md={12} lg={5.9} xl={5.9}>
          <UpdateUsernameFormClient username={currentUser.userName} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5.9} xl={5.9}>
          <UpdateEmailFormClient email={currentUser.email} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5.9} xl={5.9}>
          <PersonalDataUpdateFormClient currentUser={currentUser} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5.9} xl={5.9}>
          <UpdatePasswordFormClient username={currentUser.userName} />
        </Grid>
      </Grid>
    </Suspense>
  );
};

export default ProfileUpdateFormServer;
