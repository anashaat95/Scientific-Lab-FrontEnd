import "server-only";
import EditCountryFormServer from "../../../forms/EditCountryFormServer";
const EditCountryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EditCountryFormServer id={id} />;
};

export default EditCountryPage;
