import "server-only";

import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import { GetJwtTokenPayload } from "@/services/jwtTokenService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CustomLoader from "./CustomLoader";

const CheckIsLoggedIn = async ({ children }: { children: (currentUser: IUser) => React.ReactNode }) => {
  const token = await GetJwtTokenPayload();
  if (!token) redirect("/login");

  const data = cookies().get("currentUser")?.value;
  if (!data) redirect("/login");

  const currentUser: IUser = JSON.parse(data);
  return <Suspense fallback={<CustomLoader page={true} />}>{children(currentUser)}</Suspense>;
};

export default CheckIsLoggedIn;
