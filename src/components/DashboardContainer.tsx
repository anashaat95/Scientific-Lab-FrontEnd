import { RootState } from "@/store/store";
import { Container, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen }: { isSidebarOpen: boolean } = useSelector((state: RootState) => state.ui);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  return (
    <Container
      sx={{
        maxWidth: "1300px !important",
        zIndex: 1,
        ...(!isSidebarOpen && lgUp && { transition: "transform 0.3s ease", transform: `${!isSidebarOpen ? "translateX(-160px)" : "translateX(0)"}` }),
      }}
    >
      {children}
    </Container>
  );
};

export default DashboardContainer;
