import DeleteCityFormServer from "../../../forms/DeleteCityFormServer";

const DeleteCityPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <DeleteCityFormServer id={id} />;
};

export default DeleteCityPage;
