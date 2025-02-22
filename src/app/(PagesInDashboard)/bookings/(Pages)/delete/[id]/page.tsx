import DeleteBookingFormServer from "../../../forms/DeleteBookingFormServer";

const DeleteBookingPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <DeleteBookingFormServer id={id} />;
};

export default DeleteBookingPage;
