import "server-only";
import EditMaintenanceLogFormServer from "../../../forms/EditMaintenanceLogFormServer";
const EditMaintenanceLogPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EditMaintenanceLogFormServer id={id} />;
};

export default EditMaintenanceLogPage;
