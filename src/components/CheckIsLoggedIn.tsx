import "server-only";

import { getMeService } from "@/app/(Authentication)/authServicesServer";
import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import { GetJwtTokenPayload } from "@/services/jwtTokenService";
import { fetcherFn } from "@/services/sharedServices";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CustomLoader from "./CustomLoader";

const CheckIsLoggedIn = async ({ children }: { children: (currentUser: IUser) => React.ReactNode }) => {
  const token = await GetJwtTokenPayload();
  if (!token) redirect("/login");

  const data = await fetcherFn(getMeService);

  const currentUser: IUser = data?.data?.data;
  return <Suspense fallback={<CustomLoader page={true} />}>{children(currentUser)}</Suspense>;
};

export default CheckIsLoggedIn;
