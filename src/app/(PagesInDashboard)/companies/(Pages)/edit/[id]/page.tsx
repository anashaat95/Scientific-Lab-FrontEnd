import "server-only";
import EditCompanyFormServer from "../../../forms/EditCompanyFormServer";
const EditCompanyPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EditCompanyFormServer id={id} />;
};

export default EditCompanyPage;
