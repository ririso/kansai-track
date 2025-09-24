import { RepaymentScheduleType } from "@/types/repaymentScheduleType";
import { RepaymentTable } from "../ui/RepaymentTable";

type Props = {
  paginatedSchedules: RepaymentScheduleType[];
  itemsPerPage: number;
};

export function RepaymentScheduleDetail({
  paginatedSchedules,
  itemsPerPage,
}: Props) {
  return (
    <RepaymentTable
      schedules={paginatedSchedules}
      showDummyRows={true}
      itemsPerPage={itemsPerPage}
      tableFixed={true}
    />
  );
}
