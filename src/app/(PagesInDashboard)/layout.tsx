import CheckIsLoggedIn from "@/components/CheckIsLoggedIn";
import Menuitems from "@/components/sidebar/MenuItems";
import React from "react";
import "server-only";
import DashboardPageLayoutClient from "./DashboadPageLayoutClient";
import { IUser } from "./users/usersInterfaces";

const filterItems = (excludedTitles: string[]) => {
  return Menuitems.filter((item) => !excludedTitles.includes(item.title));
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <CheckIsLoggedIn>
      {(currentUser: IUser) => <DashboardPageLayoutClient currentUser={currentUser}>{children}</DashboardPageLayoutClient>}
    </CheckIsLoggedIn>
  );
}
