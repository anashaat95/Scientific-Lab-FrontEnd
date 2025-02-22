import "server-only";
import EditEquipmentFormServer from "../../../forms/EditEquipmentFormServer";
const EditEquipmentPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EditEquipmentFormServer id={id} />;
};

export default EditEquipmentPage;
