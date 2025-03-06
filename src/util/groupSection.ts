import { ICourseDeatils } from "@/state";

export function groupSections(
  selectedSections: ICourseDeatils[]
): ICourseDeatils[][] {
  // Group sections by day first
  const sectionsByDay: { [key: string]: ICourseDeatils[] } = {};

  for (const section of selectedSections) {
    if (!sectionsByDay[section.day]) {
      sectionsByDay[section.day] = [];
    }
    sectionsByDay[section.day].push(section);
  }

  const result: ICourseDeatils[][] = [];

  // Process each day separately
  Object.values(sectionsByDay).forEach((daySections) => {
    // Skip if there's only one section for the day
    if (daySections.length <= 1) {
      if (daySections.length === 1) {
        result.push([daySections[0]]);
      }
      return;
    }

    const groups: ICourseDeatils[][] = [];

    // Start with each section in its own group
    for (const section of daySections) {
      groups.push([section]);
    }

    // Merge groups with overlapping sections
    let mergeHappened = true;
    while (mergeHappened) {
      mergeHappened = false;

      for (let i = 0; i < groups.length; i++) {
        for (let j = i + 1; j < groups.length; j++) {
          // Check if any section in group i conflicts with any section in group j
          const shouldMerge = groups[i].some((sectionI) =>
            groups[j].some((sectionJ) => sectionsConflict(sectionI, sectionJ))
          );

          if (shouldMerge) {
            // Merge groups j into i and remove j
            groups[i] = [...groups[i], ...groups[j]];
            groups.splice(j, 1);
            mergeHappened = true;
            break;
          }
        }
        if (mergeHappened) break;
      }
    }

    // Add all groups for this day to the result
    result.push(...groups);
  });

  return result;
}

// Helper function to check if two sections have time conflict
function sectionsConflict(
  section1: ICourseDeatils,
  section2: ICourseDeatils
): boolean {
  if (section1.day !== section2.day) return false;

  const section1Start = timeToMinutes(section1.startTime);
  const section1End = timeToMinutes(section1.endTime);
  const section2Start = timeToMinutes(section2.startTime);
  const section2End = timeToMinutes(section2.endTime);

  return (
    (section1Start < section2End && section1End > section2Start) ||
    (section2Start < section1End && section2End > section1Start)
  );
}

function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}
