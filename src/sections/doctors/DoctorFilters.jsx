import UniversalFilters from "../../components/filters/UniversalFilters";
import { doctorFilterSchema } from "../../config/doctorFilterSchema";

export default function DoctorFilters(props) {
  return <UniversalFilters schema={doctorFilterSchema} {...props} />;
}
