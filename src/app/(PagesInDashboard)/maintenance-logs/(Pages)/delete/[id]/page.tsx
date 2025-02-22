import DeleteMaintenanceLogFormServer from "../../../forms/DeleteMaintenanceLogFormServer";

const DeleteMaintenanceLogPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <DeleteMaintenanceLogFormServer id={id} />;
};

export default DeleteMaintenanceLogPage;
