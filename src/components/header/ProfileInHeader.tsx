import { Avatar, Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

import { useAuth } from "@/app/(Authentication)/authHooks/useAuth";
import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import { SubmitButton, TextButton } from "@/elements/CustomButtons";
import { RootState } from "@/store/store";
import { IconMail } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ProfileInHeader = () => {
  const { currentUser }: { currentUser: IUser } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick}
      >
        <Avatar
          src={currentUser?.image_url ?? "/images/profile/user-1.jpg"}
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      <Menu
        id="msgs-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>
            <TextButton onClick={() => router.push(`/account/${currentUser?.userName}`)}>My Account</TextButton>
          </ListItemText>
        </MenuItem>

        <Box mt={1} py={1} px={2}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClose();
              logout.mutate();
            }}
          >
            <SubmitButton type="submit" variant="outlined" sx={{ width: "100%" }}>
              Logout
            </SubmitButton>
          </form>
        </Box>
      </Menu>
    </Box>
  );
};

export default ProfileInHeader;
