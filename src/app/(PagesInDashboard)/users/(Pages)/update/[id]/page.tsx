import "server-only";
import UpdateUserFormServer from "../../../forms/UpdateUserFormServer";
const UpdateUserPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <UpdateUserFormServer id={id} />;
};

export default UpdateUserPage;
