import DeleteEquipmentForm from "../../../forms/DeleteEquipmentForm";

const DeleteEquipmentPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <DeleteEquipmentForm id={id} />;
};

export default DeleteEquipmentPage;
