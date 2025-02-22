import "server-only";
import EditUserFormServer from "../../../forms/EditUserFormServer";
const EditUserPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EditUserFormServer id={id} />;
};

export default EditUserPage;
