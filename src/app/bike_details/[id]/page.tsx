import CarDetails from "@/components/HomePage/CarDetails";

const BikeDetailsPage = ({ params }: { params: { id: string } }) => {
  return <CarDetails params={params} />;
};

export default BikeDetailsPage;
