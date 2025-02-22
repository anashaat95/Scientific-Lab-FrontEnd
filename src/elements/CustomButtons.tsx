"use client";
import { AppDispatch, RootState } from "@/store/store";
import { toggleSidebar } from "@/store/uiSlice";
import { Theme } from "@emotion/react";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, ButtonProps, IconButton, SxProps, Typography, TypographyProps } from "@mui/material";
import { IconMenu } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

interface TextButtonProps extends TypographyProps {
  onClick?: () => void; // Custom click handler
  href?: string; // Custom click handler
}

export const TextButton = ({ href, onClick, children, ...props }: TextButtonProps) => {
  const router = useRouter();

  let handleClick = onClick;
  if (href) {
    handleClick = () => router.push(href);
  }

  return (
    <Typography
      fontWeight="500"
      sx={{
        textDecoration: "none",
        color: "primary.main",
        cursor: "pointer",
        "&:hover": { color: "primary.dark" },
      }}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const NormalButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant="contained" size="large" sx={{ color: "secondary", ...props.sx }} type="button" {...props}>
      {children}
    </Button>
  );
};

export const SubmitButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant="contained" size="large" sx={{ color: "secondary", ...props.sx }} type="submit" {...props}>
      {children}
    </Button>
  );
};

export const CancelButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant="outlined" color="secondary" sx={{ textTransform: "none", ...props.sx }} {...props}>
      {children}
    </Button>
  );
};
export const GoBackButton = ({ ...props }: ButtonProps) => {
  const router = useRouter();
  return (
    <Button variant="contained" size="large" sx={{ color: "secondary", ...props.sx }} type="button" {...props} onClick={() => router.back()}>
      <ArrowBackIcon />
    </Button>
  );
};

export const GoToButton = ({ href, children, ...props }: ButtonProps & { href: string }) => {
  const router = useRouter();
  return (
    <Button variant="contained" size="large" sx={{ color: "secondary", ...props.sx }} type="button" {...props} onClick={() => router.push(href)}>
      {children}
    </Button>
  );
};

export const ToggleSidebarButton = ({ sx }: { sx?: SxProps<Theme> }) => {
  const { isSidebarOpen }: { isSidebarOpen: boolean } = useSelector((state: RootState) => state.ui);
  const dispatch: AppDispatch = useDispatch();
  return (
    <IconButton
      color="primary"
      aria-label="menu"
      onClick={() => dispatch(toggleSidebar())}
      sx={{ position: "fixed", zIndex: 2000, top: "24px", left: "24px", display: "flex", justifyContent: "center", alignItems: "center", ...sx }}
    >
      {isSidebarOpen ? <ChevronLeftIcon width="30" height="30" /> : <IconMenu width="30" height="30" />}
    </IconButton>
  );
};
