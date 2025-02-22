import DeleteDepartmentFormServer from "../../../forms/DeleteDepartmentFormServer";

const DeleteDepartmentPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <DeleteDepartmentFormServer id={id} />;
};

export default DeleteDepartmentPage;
