import "server-only";
import UpdateLabFormServer from "../../../forms/UpdateLabFormServer";
const UpdateLabPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <UpdateLabFormServer id={id} />;
};

export default UpdateLabPage;
