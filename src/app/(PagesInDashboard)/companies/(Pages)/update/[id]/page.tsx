import "server-only";
import UpdateCompanyFormServer from "../../../forms/UpdateCompanyFormServer";
const UpdateCompanyPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <UpdateCompanyFormServer id={id} />;
};

export default UpdateCompanyPage;
