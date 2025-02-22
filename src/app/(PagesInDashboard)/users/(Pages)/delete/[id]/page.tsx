import DeleteUserFormServer from "../../../forms/DeleteUserFormServer";
const DeleteUserPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <DeleteUserFormServer id={id} />;
};

export default DeleteUserPage;
