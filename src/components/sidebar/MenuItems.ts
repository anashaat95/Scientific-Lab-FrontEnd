import { enUserRoles } from "@/app/(PagesInDashboard)/roles/rolesInterfaces";
import {
  IconBrandBooking,
  IconBuildingCommunity,
  IconBuildingEstate,
  IconBuildingSkyscraper,
  IconBuildingWarehouse,
  IconDeviceImac,
  IconEaseInOutControlPoints,
  IconLayoutDashboard,
  IconUsersGroup,
  IconWallpaper,
  IconWorld,
  TablerIconsProps,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

export interface ISubHeader {
  navlabel: boolean;
  subheader: string;
}

export interface IPageSidebarData {
  id: string;
  title: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  href: string;
}

export type MenuItem = ISubHeader | IPageSidebarData;

const Menuitems: Array<any> = [
  {
    navlabel: true,
    subheader: "Home",
    authz: "all",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    id: uniqueId(),
    title: "Bookings",
    icon: IconBrandBooking,
    href: "/bookings",
  },
  {
    id: uniqueId(),
    title: "Equipments",
    icon: IconDeviceImac,
    href: "/equipments",
  },
  {
    id: uniqueId(),
    title: "Maintenance Logs",
    icon: IconWallpaper,
    href: "/maintenance-logs",
  },
  {
    navlabel: true,
    subheader: "Lab Supervisor Area",
    authz: "supervisor",
  },
  {
    id: uniqueId(),
    title: "Countries",
    icon: IconWorld,
    href: "/countries",
  },
  {
    id: uniqueId(),
    title: "Cities",
    icon: IconBuildingCommunity,
    href: "/cities",
  },
  {
    id: uniqueId(),
    title: "Companies",
    icon: IconBuildingSkyscraper,
    href: "/companies",
  },
  {
    id: uniqueId(),
    title: "Departments",
    icon: IconBuildingWarehouse,
    href: "/departments",
  },
  {
    id: uniqueId(),
    title: "Labs",
    icon: IconBuildingEstate,
    href: "/labs",
  },
  {
    navlabel: true,
    subheader: "Admin Area",
    authz: "admin",
  },
  {
    id: uniqueId(),
    title: "Roles",
    icon: IconEaseInOutControlPoints,
    href: "/roles",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconUsersGroup,
    href: "/users",
  },
];

export default Menuitems;

export const filterMenuItemsByRole = (userRoles?: string | null): Array<any> => {
  if (userRoles?.includes(enUserRoles[enUserRoles.Admin])) {
    return Menuitems;
  }

  const ItemsBasedOnRoles = [];

  for (let index = 0; index < Menuitems.length; index++) {
    const item = Menuitems[index];
    if (userRoles?.includes(enUserRoles[enUserRoles.LabSupervisor])) {
      if (item.authz === "admin") break;
      ItemsBasedOnRoles.push(item);
      continue;
    }

    if (item.authz === "supervisor") break;
    ItemsBasedOnRoles.push(item);
  }

  return ItemsBasedOnRoles;
};
