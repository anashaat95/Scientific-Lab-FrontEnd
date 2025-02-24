import "server-only";
import UpdateDepartmentFormServer from "../../../forms/UpdateDepartmentFormServer";
const UpdateDepartmentPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <UpdateDepartmentFormServer id={id} />;
};

export default UpdateDepartmentPage;
