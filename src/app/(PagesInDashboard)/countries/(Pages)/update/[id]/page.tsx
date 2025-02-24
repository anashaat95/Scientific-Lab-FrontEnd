import "server-only";
import UpdateCountryFormServer from "../../../forms/UpdateCountryFormServer";
const UpdateCountryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <UpdateCountryFormServer id={id} />;
};

export default UpdateCountryPage;
