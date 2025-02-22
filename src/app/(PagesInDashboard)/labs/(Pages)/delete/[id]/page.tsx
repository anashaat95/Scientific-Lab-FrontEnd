import DeleteLabFormServer from "../../../forms/DeleteLabFormServer";

const DeleteLabPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <DeleteLabFormServer id={id} />;
};

export default DeleteLabPage;
