import "server-only";
import EditCityFormServer from "../../../forms/EditCityFormServer";
const EditCityPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EditCityFormServer id={id} />;
};

export default EditCityPage;
