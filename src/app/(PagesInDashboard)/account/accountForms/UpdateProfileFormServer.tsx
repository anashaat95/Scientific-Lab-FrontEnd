import "server-only";

import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import { getUserByFieldService } from "@/app/(PagesInDashboard)/users/usersServicesBackEnd";
import CustomLoader from "@/components/CustomLoader";
import { IFetcherData } from "@/interfaces";
import { fetcherFn } from "@/services/sharedServices";
import { Box } from "@mui/material";
import { Suspense } from "react";
import { ProfilePageProps } from "../[username]/page";
import PersonalDataUpdateFormClient from "./UpdatePersonalDataFormClient";
import UpdateEmailFormClient from "./UpdateEmailFormClient";

const ProfileUpdateFormServer = async ({ params }: ProfilePageProps) => {
  const { username } = params;
  const data: IFetcherData = await fetcherFn(() => getUserByFieldService(username));
  const currentUser: IUser = data?.data?.data;

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <Box display="flex" justifyContent="center" flexGrow={1} gap={3}>
        <PersonalDataUpdateFormClient currentUser={currentUser} />
        <UpdateEmailFormClient currentUser={currentUser} />
      </Box>
    </Suspense>
  );
};

export default ProfileUpdateFormServer;
