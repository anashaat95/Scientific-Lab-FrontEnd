import "server-only";
import UpdateEquipmentFormServer from "../../../forms/UpdateEquipmentFormServer";
const UpdateEquipmentPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <UpdateEquipmentFormServer id={id} />;
};

export default UpdateEquipmentPage;
