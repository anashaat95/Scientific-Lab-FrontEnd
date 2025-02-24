import "server-only";
import UpdateMaintenanceLogFormServer from "../../../forms/UpdateMaintenanceLogFormServer";
const UpdateMaintenanceLogPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <UpdateMaintenanceLogFormServer id={id} />;
};

export default UpdateMaintenanceLogPage;
