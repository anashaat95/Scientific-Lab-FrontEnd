import LinkStyled from "@/components/style/LinkStyled";
import { Box } from "@mui/material";
import Image from "next/image";

const Logo = () => {
  return (
    <Box mb={4} display="flex" justifyContent="center" alignItems="center">
      <LinkStyled href="/dashboard">
        <Image src="/images/logos/logo-dark-vertical.png" alt="logo" height={80} width={185} priority />
        {/* <Image src="/images/logos/logo.svg" alt="logo" height={80} width={185} priority /> */}
      </LinkStyled>
    </Box>
  );
};

export default Logo;
