import { getUserAvailability } from "@/actions/availability";
import AvailabilityForm from "@/components/availabilityForm";
import { defaultDaysAvailability } from "@/lib/data";

const AvailabilityPage = async () => {
  let availability = await getUserAvailability();
  if (!availability) {
    availability = { availabilityData: defaultDaysAvailability, timeGap: 30 };
  }
  // console.log("here is data !!!!!!!!!!!!!" + JSON.stringify(availability));
  console.log("here is data !!!!!!!!!!!!!" + availability);
  return (
    <div>
      <h1>Availability</h1>
      <AvailabilityForm initialData={availability} />
    </div>
  );
};
export default AvailabilityPage;
