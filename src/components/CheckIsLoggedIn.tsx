import "server-only";

import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import { getUserByIdService } from "@/app/(PagesInDashboard)/users/usersServicesBackEnd";
import { GetJwtTokenPayload } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CustomLoader from "./CustomLoader";
import CustomMessage from "./CustomMessage";

const CheckIsLoggedIn = async ({ children }: { children: (currentUser: IUser) => React.ReactNode }) => {
  const token = await GetJwtTokenPayload();
  if (!token) return redirect("/login");

  const data = await fetcherFn(() => getUserByIdService(token.sub));
  if (data.isError)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width="95vw" height="95vh">
        <CustomMessage type={data.isNetworkError ? "network" : "error"}>{data.errorMessage}</CustomMessage>
      </Box>
    );
  const currentUser: IUser = data?.data?.data;
  if (!currentUser) redirect("/login");

  return <Suspense fallback={<CustomLoader page={true} />}>{children(currentUser)}</Suspense>;
};

export default CheckIsLoggedIn;
