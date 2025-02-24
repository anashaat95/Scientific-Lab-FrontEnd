import "server-only";
import UpdateBookingFormServer from "../../../forms/UpdateBookingFormServer";
const UpdateBookingPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <UpdateBookingFormServer id={id} />;
};

export default UpdateBookingPage;
