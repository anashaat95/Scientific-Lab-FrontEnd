import DeleteCompanyFormServer from "../../../forms/DeleteCompanyFormServer";

const DeleteCompanyPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <DeleteCompanyFormServer id={id} />;
};

export default DeleteCompanyPage;
