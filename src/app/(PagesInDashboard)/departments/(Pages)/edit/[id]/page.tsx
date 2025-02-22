import "server-only";
import EditDepartmentFormServer from "../../../forms/EditDepartmentFormServer";
const EditDepartmentPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EditDepartmentFormServer id={id} />;
};

export default EditDepartmentPage;
