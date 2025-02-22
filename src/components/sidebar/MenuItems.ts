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
    title: "Countries",
    icon: IconWorld,
    href: "/countries",
  },
  {
    id: uniqueId(),
    title: "Departments",
    icon: IconBuildingWarehouse,
    href: "/departments",
  },
  {
    id: uniqueId(),
    title: "Equipments",
    icon: IconDeviceImac,
    href: "/equipments",
  },
  {
    id: uniqueId(),
    title: "Labs",
    icon: IconBuildingEstate,
    href: "/labs",
  },
  {
    id: uniqueId(),
    title: "Maintenance Logs",
    icon: IconWallpaper,
    href: "/maintenance-logs",
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

const filterItems = (excludedTitles: string[]) => {
  return Menuitems.filter((item) => !excludedTitles.includes(item.title));
};

export const filterMenuItemsByRole = (uRoles?: string | string[] | null): Array<any> => {
  let userRoles: string[] = [];

  if (typeof uRoles === "string") userRoles.push(uRoles);
  else if (Array.isArray(uRoles)) userRoles.push(...uRoles);

  if (userRoles?.some((role) => role === enUserRoles[enUserRoles.Admin])) {
    return Menuitems;
  }

  let excludedTitles: string[] = [];

  if (userRoles?.some((role) => role === enUserRoles[enUserRoles.LabSupervisor])) {
    excludedTitles = ["Users", "Roles"];
  } else if (userRoles?.some((role) => role === enUserRoles[enUserRoles.Researcher])) {
    excludedTitles = ["Roles", "Users", "Labs", "Departments", "Countries", "Companies", "Cities"];
  } else if (userRoles?.some((role) => role === enUserRoles[enUserRoles.Technician])) {
    excludedTitles = ["Roles", "Users", "Labs", "Departments", "Countries", "Companies", "Cities"];
  } else if (userRoles?.some((role) => role === enUserRoles[enUserRoles.User])) {
    excludedTitles = ["Roles", "Users", "Labs", "Departments", "Countries", "Companies", "Cities"];
  }

  return filterItems(excludedTitles);
};
