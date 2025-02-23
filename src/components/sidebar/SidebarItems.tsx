"use client";
import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import { RootState } from "@/store/store";
import { Box, List } from "@mui/material";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { filterMenuItemsByRole } from "./MenuItems";
import NavGroup from "./NavGroup/NavGroup";
import NavItem from "./NavItem";

const SidebarItems = () => {
  const { currentUser }: { currentUser: IUser } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const pathDirect = "/" + pathname.split("/")[1];
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
