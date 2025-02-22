import DeleteCountryFormServer from "../../../forms/DeleteCountryFormServer";

const DeleteCountryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <DeleteCountryFormServer id={id} />;
};

export default DeleteCountryPage;
