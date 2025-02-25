import "server-only";

import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import CustomLoader from "@/components/CustomLoader";
import { GoBackButton } from "@/elements/CustomButtons";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Box } from "@mui/material";
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
      <Box display="flex" flexDirection="column" justifyContent="center" gap={3}>
        <Box display="flex" justifyContent="center" gap={3} flexGrow={1}>
          <UpdateUsernameFormClient username={currentUser.userName} />
          <UpdateEmailFormClient email={currentUser.email} />
        </Box>
        <Box display="flex" justifyContent="center" gap={3} flexGrow={1}>
          <PersonalDataUpdateFormClient currentUser={currentUser} />
          <UpdatePasswordFormClient username={currentUser.userName} />
        </Box>
      </Box>
    </Suspense>
  );
};

export default ProfileUpdateFormServer;
