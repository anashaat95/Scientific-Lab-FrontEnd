import CheckIsLoggedIn from "@/components/CheckIsLoggedIn";
import React from "react";
import "server-only";
import DashboardPageLayoutClient from "./DashboadPageLayoutClient";
import { IUser } from "./users/usersInterfaces";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <CheckIsLoggedIn>
      {(currentUser: IUser) => <DashboardPageLayoutClient currentUser={currentUser}>{children}</DashboardPageLayoutClient>}
    </CheckIsLoggedIn>
  );
}
