import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { isAuthorized } from "@/services/jwtTokenService";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { enUserRoles } from "../../roles/rolesInterfaces";
import { CITIES_FRONTEND_ENDPOINT } from "../citiesConsts";
import AddCityForm from "./AddCityForm";

const AddCityFormServer = async () => {
  const isAllowed = await isAuthorized([enUserRoles.Admin.toString(), enUserRoles.LabSupervisor.toString()]);
  if (!isAllowed) redirect(CITIES_FRONTEND_ENDPOINT);
  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <AddCityForm />
    </Suspense>
  );
};

export default AddCityFormServer;
