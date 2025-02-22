import CustomLoader from "@/components/CustomLoader";
import { fetcherFn } from "@/services/sharedServices";
import { Suspense } from "react";
import "server-only";
import { getAllEquipmentsService } from "../equipmentsServicesBackEnd";
import EquipmentsTable from "./EquipmentsTable";

const EquipmentsFetcher = async () => {
  const data = await fetcherFn(getAllEquipmentsService);

  return (
    <Suspense fallback={<CustomLoader />}>
      <EquipmentsTable {...data} />
    </Suspense>
  );
};

export default EquipmentsFetcher;
