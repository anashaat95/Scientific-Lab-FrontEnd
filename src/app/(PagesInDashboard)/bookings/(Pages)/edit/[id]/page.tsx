import "server-only";
import EditBookingFormServer from "../../../forms/EditBookingFormServer";
const EditBookingPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EditBookingFormServer id={id} />;
};

export default EditBookingPage;
