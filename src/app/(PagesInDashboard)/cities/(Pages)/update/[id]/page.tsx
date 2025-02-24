import "server-only";
import UpdateCityFormServer from "../../../forms/UpdateCityFormServer";
const UpdateCityPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <UpdateCityFormServer id={id} />;
};

export default UpdateCityPage;
