"use client";
import { ToggleSidebarButton } from "@/elements/CustomButtons";
import { AppDispatch, RootState } from "@/store/store";
import { closeSidebar } from "@/store/uiSlice";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Logo";
import SidebarItems from "./SidebarItems";

const sidebarWidth = "320px";

const Sidebar = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const { isSidebarOpen }: { isSidebarOpen: boolean } = useSelector((state: RootState) => state.ui);
  const dispatch: AppDispatch = useDispatch();

  if (lgUp) {
    return (
      <>
        <ToggleSidebarButton />
        <Box
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            borderRadius: "13px",
          }}
        >
          {/* Sidebar for desktop */}
          <Drawer
            anchor="left"
            open={isSidebarOpen}
            variant="permanent"
            ModalProps={{
              keepMounted: true, // Prevents background shading and keeps interactions active
            }}
            PaperProps={{
              sx: {
                boxShadow: "0 9px 17.5px rgb(0,0,0,0.05)",
                width: isSidebarOpen ? sidebarWidth : 0,
                boxSizing: "border-box",
                borderRight: 0,
                top: 20,
                left: 20,
                bottom: 20,
                borderRadius: "13px",
                height: "calc(100% - 40px)",
                "& .MuiDrawer-paper": {
                  transition: "transform 0.3s ease, width 0.3s ease, opacity 0.3s ease, visibility 0.3s ease",
                  transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
                  opacity: isSidebarOpen ? 1 : 0,
                  visibility: isSidebarOpen ? "visible" : "hidden",
                  position: "absolute",
                },
              },
            }}
          >
            <Box sx={{ height: "100%" }}>
              <Box>
                <Logo />
              </Box>
              <Box>
                <SidebarItems />
              </Box>
            </Box>
          </Drawer>
        </Box>
      </>
    );
  }

  return (
    <>
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={() => dispatch(closeSidebar())}
        variant="temporary"
        PaperProps={{
          sx: {
            width: sidebarWidth,
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        <Box px={2}>
          <Logo />
        </Box>
        <SidebarItems />
      </Drawer>
    </>
  );
};

export default Sidebar;
