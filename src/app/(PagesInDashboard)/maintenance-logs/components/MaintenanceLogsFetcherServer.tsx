import CustomLoader from "@/components/CustomLoader";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";
import "server-only";
import { getAllMaintenanceLogsService } from "../MaintenanceLogsServicesBackEnd";
import MaintenanceLogsTable from "./MaintenanceLogsTable";

const MaintenanceLogsFetcher = async () => {
  const data = await fetcherFn(getAllMaintenanceLogsService);
  return (
    <Suspense fallback={<CustomLoader />}>
      <MaintenanceLogsTable {...data} />
    </Suspense>
  );
};

export default MaintenanceLogsFetcher;
