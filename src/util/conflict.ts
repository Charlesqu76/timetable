import { ICourseDeatils } from "@/state";

export default function getConflicts(
  selectSection: ICourseDeatils,
  selectedSections: ICourseDeatils[]
) {
  const { startTime, endTime, day } = selectSection;
  const section1Start = timeToMinutes(startTime);
  const section1End = timeToMinutes(endTime);
  const selected = selectedSections.filter((section) => section.day === day);
  const conflicts: ICourseDeatils[] = [];

  for (const section of selected) {
    const { startTime, endTime } = section;
    const section2Start = timeToMinutes(startTime);
    const section2End = timeToMinutes(endTime);
    if (
      (section1Start < section2End && section1End > section2Start) ||
      (section2Start < section1End && section2End > section1Start)
    ) {
      conflicts.push(section);
    }
  }

  return conflicts;
}

function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}
