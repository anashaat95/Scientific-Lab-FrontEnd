// Server-side component (AuthPageLayoutServer.tsx)
import CustomLoader from "@/components/CustomLoader";
import CustomMessage from "@/components/CustomMessage";
import { GetJwtTokenPayload } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import "server-only";
import { IUser } from "../(PagesInDashboard)/users/usersInterfaces";
import { getUserByIdService } from "../(PagesInDashboard)/users/usersServicesBackEnd";
import { IAuthPageLayout } from "./authInterfaces";
import AuthPageLayoutClient from "./AuthPageLayoutClient"; // Client Component

const AuthPageLayoutServer = async ({ title, description, gridSizes, children }: IAuthPageLayout) => {
  const token = await GetJwtTokenPayload();
  if (token) {
    const data = await fetcherFn(() => getUserByIdService(token.sub));
    if (data.isError)
      return (
        <Box display="flex" justifyContent="center" alignItems="center" width="95vw" height="95vh">
          <CustomMessage type={data.isNetworkError ? "network" : "error"}>{data.errorMessage}</CustomMessage>
        </Box>
      );
    const currentUser: IUser = data?.data?.data;
    if (currentUser) return redirect("/dashboard");
  }

  return (
    <Suspense fallback={<CustomLoader />}>
      <AuthPageLayoutClient title={title} description={description} gridSizes={gridSizes}>
        {children}
      </AuthPageLayoutClient>
    </Suspense>
  );
};

export default AuthPageLayoutServer;
