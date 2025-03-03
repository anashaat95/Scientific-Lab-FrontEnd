"use client";
import { AppBar, Badge, Box, IconButton, Stack, Toolbar, Typography, styled, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";

// components
import { ToggleSidebarButton } from "@/elements/CustomButtons";
import { IconBellRinging } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Menuitems from "../sidebar/MenuItems";
import ProfileInHeader from "./ProfileInHeader";

const Header = () => {
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));
  let splittedPath = pathname.split("/");
  let pageTitle = undefined;

  if (splittedPath[1] === "account") pageTitle = "Profile";
  if (!pageTitle) {
    const foundMenuItem = Menuitems.find((item) => item.href === `/${splittedPath[1]}`);
    pageTitle = foundMenuItem ? foundMenuItem.title : splittedPath.at(-1);
  }

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    borderRadius: 13,
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {!lgUp && <ToggleSidebarButton sx={{ position: "relative", top: 0, left: 0 }} />}

        {/* Left-aligned notification icon */}
        <IconButton size="large" aria-label="show 11 new notifications" color="inherit" aria-controls="msgs-menu" aria-haspopup="true">
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton>

        {/* Centered Page Name */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Typography variant="h2" color="primary">
            {pageTitle}
          </Typography>
        </Box>

        {/* Right-aligned Profile Component */}
        <Stack spacing={1} direction="row" alignItems="center">
          <ProfileInHeader />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
