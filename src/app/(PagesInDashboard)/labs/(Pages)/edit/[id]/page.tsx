import "server-only";
import EditLabFormServer from "../../../forms/EditLabFormServer";
const EditLabPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EditLabFormServer id={id} />;
};

export default EditLabPage;
