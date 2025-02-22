import LinkStyled from "@/components/style/LinkStyled";
import { Theme } from "@emotion/react";
import { Box, SxProps } from "@mui/material";
import Image from "next/image";

const Logo = ({ sx }: { sx?: SxProps<Theme> }) => {
  return (
    <Box mb={4} display="flex" justifyContent="center" alignItems="center" sx={{ ...sx }}>
      <LinkStyled href="/dashboard">
        <Image src="/images/logos/logo-dark-vertical.png" alt="logo" height={80} width={185} priority />
        {/* <Image src="/images/logos/logo.svg" alt="logo" height={80} width={185} priority /> */}
      </LinkStyled>
    </Box>
  );
};

export default Logo;
