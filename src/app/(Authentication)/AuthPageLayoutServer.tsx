// Server-side component (AuthPageLayoutServer.tsx)
import CustomLoader from "@/components/CustomLoader";
import { GetJwtTokenPayload } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import "server-only";
import { IAuthPageLayout } from "./authInterfaces";
import AuthPageLayoutClient from "./AuthPageLayoutClient"; // Client Component

let trials = 0;

const AuthPageLayoutServer = async ({ title, description, gridSizes, children }: IAuthPageLayout) => {
  const token = await GetJwtTokenPayload();
  if (token && trials < 3) {
    redirect("/dashboard");
    trials += 1;
  } else {
    trials = 0;
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
