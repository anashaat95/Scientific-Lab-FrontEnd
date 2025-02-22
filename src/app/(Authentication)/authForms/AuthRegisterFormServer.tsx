import "server-only";

import CustomLoader from "@/components/CustomLoader";
import { IItemInSelect } from "@/interfaces";
import { getCompaniesDepartmentsLabsSelectOptionsData } from "@/services/sharedServices";
import { Suspense } from "react";
import { ITitleAndChildrenProps } from "../authInterfaces";
import AuthPageLayoutServer from "../AuthPageLayoutServer";
import AuthRegisterForm from "./AuthRegisterForm";

const AuthRegisterFormServer = async ({ title, children }: ITitleAndChildrenProps) => {
  const data: { companies: IItemInSelect[]; departments: IItemInSelect[]; labs: IItemInSelect[] } =
    await getCompaniesDepartmentsLabsSelectOptionsData();

  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <AuthPageLayoutServer title={title} description="this is Register page" gridSizes={{ sm: 10, md: 8, lg: 6, xl: 4 }}>
        <AuthRegisterForm {...data}>{children}</AuthRegisterForm>
      </AuthPageLayoutServer>
    </Suspense>
  );
};

export default AuthRegisterFormServer;
