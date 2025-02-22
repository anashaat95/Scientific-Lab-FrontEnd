import PageContainer from "@/components/container/PageContainer";
import CustomLoader from "@/components/CustomLoader";
import { Suspense } from "react";
import "server-only";

const Roles = () => {
  return (
    <Suspense fallback={<CustomLoader page={true} />}>
      <PageContainer title="Roles" description="this is roles page">
        <></>
      </PageContainer>
    </Suspense>
  );
};

export default Roles;
