"use client";
import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import { Box, List } from "@mui/material";
import { usePathname } from "next/navigation";
import { filterMenuItemsByRole } from "./MenuItems";
import NavGroup from "./NavGroup/NavGroup";
import NavItem from "./NavItem";

const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = "/" + pathname.split("/")[1];

  const currentUserDataStr = sessionStorage.getItem("currentUser");
  let currentUser: IUser | undefined = undefined;
  if (currentUserDataStr) {
    try {
      currentUser = JSON.parse(currentUserDataStr);
    } catch (error) {
      currentUser = undefined;
    }
  }

  const filteredMenuitems = filterMenuItemsByRole(currentUser?.roles);

  return (
    <Box sx={{ px: "20px" }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {filteredMenuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
